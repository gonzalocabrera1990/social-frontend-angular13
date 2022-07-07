import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../models/store/indexStore';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Followers } from './../models/followers.model';
import { followersAction, followersSuccessAction } from '../models/store/followers/followers.actions'
import { followingAction, followingSuccessAction } from '../models/store/following/following.actions'
import { storiesSuccessAction } from '../models/store/stories/stories.actions'

import { Following } from './../models/following.model';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  constructor(private http: HttpClient,
    private store: Store<RootState>,
    private processHTTPMsgService: ProcessHttpmsgService ) { }

    

  getFollowers(): Observable<Followers[] | any> {
    this.store.dispatch(followersAction());
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const id = localStorage.getItem('ID')
    return this.http.get<Followers[] | any>(baseURL + `users/angular-followers/${id}`, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(followersSuccessAction({followers: res}));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }
  getFollowing(): Observable<Following[] | any> {
    this.store.dispatch(followingAction());
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const id = localStorage.getItem('ID')
    return this.http.get<Following[] | any>(baseURL + `users/angular-following/${id}`, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(followingSuccessAction({following: res}));
        this.store.dispatch(storiesSuccessAction({stories: res}));
        return res
      }))
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  followingRequest(followingId: string, followerId: string): Observable<Following[]> {
    
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const data = {
      followingId: followingId,
      message: "Friend Request"
    }
    return this.http.post<any>(baseURL + `notification/following-user/send/${followerId}`, data, {
      headers: headers
    })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  sendData() {
    this.getFollowers()
      .subscribe(res => {
        this.store.dispatch(followersSuccessAction({followers: res}));
      })
    this.getFollowing()
      .subscribe(res => {
        this.store.dispatch(followingSuccessAction({following: res}));
      })
  }
}
