import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import * as authSelectors from '../../models/store/auth/auth.selectors';
import * as inboxSelectors from '../../models/store/inbox/inbox.selectors';
import * as userSelectors from '../../models/store/user/user.selectors';
import * as notificationsSelectors from '../../models/store/notifications/notifications.selectors';

import { RootState } from '../../models/store/indexStore';
import { User } from '../../models/user.model';
import { Notifications, NotificationResponse } from '../../models/notifications.model';
import { Inbox } from '../../models/inbox.model';

import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import { UsersService } from '../../services/users.service';
import { InboxService } from '../../services/inbox.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private storage: string | null = localStorage.getItem("ID");
  searchTerm: string | null = "";
  usuario!: string | null;
  visibled!: boolean | null;
  searchResults!: User[] | null;
  user: Observable<User | null>;
  public errMess!: string | null;
  notificationStyle: boolean | null = false;
  notificationStatus!: boolean | null;
  navbarStyle: boolean | null = false;
  notifications!: Observable<Notifications[] | null>;
  inbox!: Observable<Inbox[] | null>;
  inboxStatus!: boolean | null;
  colorful: string | null = "red";

  constructor(
    @Inject('baseURL') public baseURL: string,
    private userService: UsersService,
    private store: Store<RootState>,
    private auths: AuthService,
    private search: SearchService,
    private inboxService: InboxService,
    private router: Router
  ) {
    this.user = this.store.select(userSelectors.selectUser)
    this.store.select(state => state.auth)
      .subscribe(data => {
        this.visibled = data.isAuthenticated;
        this.usuario = data.isAuthenticated ? localStorage.getItem('CREDS')!.split('@')[0] : null;
        if (data.isAuthenticated) {
          let socketInfo = {
            id: localStorage.getItem('ID'),
            name: localStorage.getItem('CREDS')
          }
          this.inboxService.socketconection(socketInfo)
            .subscribe(res => {
              this.inboxStatusHandle();
            })
        }
      }, err => this.errMess = err)
    this.inboxService.currentDocument.subscribe(inb => {
      this.inboxStatus = true;
    })
    this.router.events.subscribe((val) => {
      this.visibled = localStorage.getItem("JWT") ? true : false;
    })
    this.user.subscribe( res => {
      if(res){
        let confirmData = res.firstname || res.lastname ? true : false
        if(!confirmData) this.router.navigate(['settings']);
      }
    })
  }

  ngOnInit() {
    if (localStorage.getItem("JWT")) {
      this.inboxService.inboxFetch()
        .subscribe(res => {
          if (res) {
            this.inboxStatus = res.some(i => i.talk.some(t => t.author !== this.storage && t.seen === false))
          }
        }, err => this.errMess = err)

      this.userService.userLogFetch()
        .subscribe(res => {
          let confirmData = res.firstname || res.lastname ? true : false
          if(!confirmData) this.router.navigate(['settings']);
        }, err => this.errMess = err)

      this.userService.fetchNotifications()
        .subscribe(res => {
          let socketInfo = {
            id: localStorage.getItem('ID'),
            name: localStorage.getItem('CREDS')
          }
          this.inboxService.socketconection(socketInfo)
            .subscribe(res => {
              this.inboxStatusHandle();
            })
        }, err => this.errMess = err)
      this.visibled = localStorage.getItem("JWT") ? true : false;
      this.usuario = localStorage.getItem('CREDS') ? localStorage.getItem('CREDS')!.split('@')[0] : null

    }
    this.inbox = this.store.select(inboxSelectors.selectInbox)

    this.user = this.store.select(userSelectors.selectUser)

    let noti = this.store.select(notificationsSelectors.selectNotifications)
    this.notifications = noti
    noti.subscribe(item => {
      if(item) this.notificationStatus = item!.some(n => n.readstatus === false)
    })


  }
  logout() {

    this.auths.destroyUserCredentials();
    this.navbarStyle = false;
    this.visibled = false;

  }


  inboxStatusHandle() {
    this.storage = localStorage.getItem("ID");
    this.inbox.subscribe(inb => {
      if (inb && this.storage) {
        this.inboxStatus = inb.some(i => i.talk.some(t => t.author !== this.storage && t.seen === false))
      }

    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.navbarStyle = false;
  }
  notify(confirm: boolean, followerId: string, notiId: string) {
    const dataNotification: NotificationResponse = {
      action: confirm,
      followerId: followerId,
      notiId: notiId
    }
    this.userService.friendRequestResponse(dataNotification)
      .subscribe(res => {
        window.location.reload();
      })
  }
  readNotification() {
    this.userService.notificationsReadstatus()
      .subscribe(data => {
        this.notificationStatus = false;
      }, err => this.errMess = err)
  }
  show() {
    this.notificationStyle = !this.notificationStyle
    if (this.notificationStatus) {
      this.readNotification();
    }
  }
  read() {
    this.inboxStatus = false;
    this.colorful = 'inherit';
    this.navbarStyle = false;
  }
  shownav() {
    this.navbarStyle = !this.navbarStyle
  }
  hidenav() {
    this.navbarStyle = false;
  }
  searching(value: string) {
    if (this.navbarStyle) this.navbarStyle = false;
    if (value) {
      this.search.handleSearch(value)
        .subscribe(res => {
          let current = res[0] ? res : null;
          this.searchResults = current;
        })
    } else {
      this.searchResults = null;
    }
  }
  clean() {
    this.searchTerm = "";
    this.searchResults = null;
  }


}
