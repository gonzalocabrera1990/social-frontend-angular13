import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../models/store/indexStore';
import { Inbox, Talking } from 'src/app/models/inbox.model';
import { InboxService } from '../../services/inbox.service';
import { FollowService } from '../../services/follow.service';
import { Following } from '../../models/following.model';
import { selectInbox } from '../../models/store/inbox/inbox.selectors';
import { selectFollowing } from '../../models/store/following/following.selectors';
import { Observable, map, filter } from 'rxjs';

@Component({
  selector: 'app-main-inbox',
  templateUrl: './main-inbox.component.html',
  styleUrls: ['./main-inbox.component.css']
})
export class MainInboxComponent implements OnInit, OnDestroy {
  private currentUser: string = localStorage.getItem("ID")!;
  follows: Observable<Following[] | null>;
  talks: Observable<Inbox[] | null>;
  maintalk: Inbox | null;
  errMess: string;
  newTalkStatus: boolean;
  newTalkUser: Following | null;

  constructor(private inboxService: InboxService,
    private store: Store<RootState>,
    private followService: FollowService) { }

  ngOnInit(): void {
    this.inboxService.inboxFetch()
      .subscribe(res => {
        return;
      })
    this.followService.getFollowing()
      .subscribe(res => {
        return;
      }, err => this.errMess = err)

    this.talks = this.store.select(selectInbox)
    this.follows = this.store.select(selectFollowing)
  }

ngOnDestroy(): void {
  let id = localStorage.getItem('ID')!;
  this.inboxService.cleanRoom(id)
}

  loadTalkMain(e: string) {

    this.talks.subscribe((item:Inbox[] | null)=>{
      let talk = item!.filter((t: Inbox) => t._id === e)[0]
      this.inboxService.talkFetch(talk)
        .subscribe((data) => {
          this.maintalk = data;
          this.newTalkUser = this.getFollowUser(data)
        });
    })
  
  }
  sendMessageEvent(data: Talking ) {
    const talkId = data.talk!._id
    const RECEPTOR = data.receptor
    const EMISOR = localStorage.getItem('ID')
    const roomSocket = data.talk!.room
    const datad = {
      contenido: {
        members: {
          userOne: EMISOR,
          userTwo: RECEPTOR
        },
        talk: {
          author: EMISOR,
          content: data.message.comment
        }
      },
      talkId,
      roomSocket
    }
    this.inboxService.sendMessage(datad)
      .subscribe((data) => {
        this.maintalk = data;
        this.newTalkStatus = false;
        this.newTalkUser = this.getFollowUser(data)
        let filterTalk = this.talks
        .subscribe(talk => {
          return talk!.some(t => t._id === data._id)
        })
      })
  }
  selectTalkMain(e: string) {
    
    this.newTalkUser = null;
    var ids = e;
    let usuario = this.currentUser;
    
    this.existChat(ids).subscribe((inb: Inbox[] | null )=>{
      this.follows.subscribe((item: Following[] | null)=>{
        if(item) this.newTalkUser = item.filter((s: Following) => s.id._id === ids)[0]
      })
      if (inb![0]) {
        let room = inb![0].room
        let query = inb![0]._id
        let data = {
          query, usuario, room
        }
        this.inboxService.inboxTalksHandler(data, e)
          .subscribe((data) => {
            this.maintalk = data;
            this.newTalkStatus = false;
            return;
          });
      } else {
        this.newTalkStatus = true;
        this.maintalk = null;
      }
    })
  }
  existChat(ID: string): Observable<Inbox[] | null> {
    let userMain = this.currentUser;
    let frienid = ID;
    
    return this.talks.pipe( 
      map(items => items!.filter(t => t.members.userOne._id === frienid || t.members.userTwo._id === frienid )) )
  }

  getFollowUser(data: Inbox):Following | any {
    let userMain = this.currentUser;
    let findUser = data.members.userOne._id === userMain ? data.members.userTwo._id : data.members.userOne._id;
    this.follows.subscribe((item: Following[] | null) =>{
      if(item){
        let follow = item!.filter((s: Following) => s.id._id === findUser)[0]
        return follow;
      }
      return
    })
  }

}