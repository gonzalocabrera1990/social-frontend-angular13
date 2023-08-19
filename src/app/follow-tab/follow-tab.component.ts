import { Component, OnInit , Inject} from '@angular/core';
import { FollowService } from '../services/follow.service';
import { Store } from '@ngrx/store';

import { selectFollowers } from '../models/store/followers/followers.selectors';
import { selectFollowing } from '../models/store/following/following.selectors';
import { RootState } from '../models/store/indexStore';
import { Followers } from '../models/followers.model'
import { Following } from '../models/following.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-follow-tab',
  templateUrl: './follow-tab.component.html',
  styleUrls: ['./follow-tab.component.css']
})
export class FollowTabComponent implements OnInit {
  followers!: Observable<Followers[] | null>;
  following!: Observable<Following[] | null>;
  usuario!: string;
  errMess!: string;
    constructor(private followService: FollowService, private store: Store<RootState>,
      @Inject('baseURL') public baseURL:string) { }

  ngOnInit(): void {
    this.followService.getFollowers()
    .subscribe(res => {
      return;
    }, err => this.errMess = err)
    this.followService.getFollowing()
    .subscribe(res => {
      return;
    }, err => this.errMess = err)

    this.followers = this.store.select(selectFollowers)
    this.following = this.store.select(selectFollowing)
    
      this.usuario = localStorage.getItem('CREDS')!.split('@')[0];
  }

}
