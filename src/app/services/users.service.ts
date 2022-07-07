import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { SettingsInterface } from '../models/settings.model';
import { baseURL } from '../shared/baseurl';

import { Store } from '@ngrx/store';
import { inboxAction, inboxErrorAction, inboxSuccessAction } from '../models/store/inbox/inbox.actions';
import { RootState } from '../models/store/indexStore';

import { ProcessHttpmsgService } from './process-httpmsg.service';
import { userAction, userErrorAction, userSuccessAction } from '../models/store/user/user.actions';
import { otheruserAction, otheruserErrorAction, otheruserSuccessAction } from '../models/store/otherusers/otherusers.actions';
import { notificationsAction, notificationsErrorAction, notificationsSuccessAction } from '../models/store/notifications/notifications.actions';

import { NotificationResponse, Notifications } from '../models/notifications.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
    private store: Store<RootState>,
    private processHTTPMsgService: ProcessHttpmsgService) { }

  userLogFetch(): Observable<User> {
    this.store.dispatch(userAction());
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const id = localStorage.getItem('CREDS');

    return this.http.get<User | any>(baseURL + 'users/get-home-user/' + id, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(userSuccessAction({user: res}));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }
  userOutlogingFetch(id: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.get<User>(baseURL + 'out-auth/get-outline-user/' + id, {
      headers: headers
    })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }

  otherUserLogFetch(username: string, user: string): Observable<User> {
    this.store.dispatch(otheruserAction());
    const auth_token = localStorage.getItem('JWT');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<User | any>(baseURL + 'users/profile/' + username + '/' + user, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(otheruserSuccessAction({otheruser: res}));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }
  settingsUsers(settings: SettingsInterface): Observable<SettingsInterface> {
    const auth_token = localStorage.getItem('JWT');
    const id_token = localStorage.getItem('ID');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.put<SettingsInterface>(baseURL + "users/settings/" + id_token, settings, {
      headers: headers
    })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }

  fetchNotifications(): Observable<Notifications[]> {
    this.store.dispatch(notificationsAction());
    const auth_token = localStorage.getItem('JWT');
    const id_token = localStorage.getItem('CREDS');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get<any>(baseURL + `notification/user-notifications/get/${id_token}`, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(notificationsSuccessAction({notifications:res}));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }
  friendRequestResponse(dataNotification: NotificationResponse): Observable<any> {
    const data = {
      action: dataNotification.action,
      followingId: localStorage.getItem("ID")
    }
    const auth_token = localStorage.getItem('JWT');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post<any>(baseURL + `notification/following-request/${dataNotification.followerId}/${dataNotification.notiId}`, data, {
      headers: headers
    })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  notificationsReadstatus(): Observable<any> {
    const auth_token = localStorage.getItem('JWT');
    const QUERY = localStorage.getItem('ID')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post<any>(baseURL + `notification/all/readtrue/${QUERY}`, {
      headers: headers
    })
      .pipe(map(res => {
        return;
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }
  getImage(ID: string): Observable<any> {
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get<any>(baseURL + `imagen/view/imagenwall/${ID}`, {
      headers: headers
    })
      .pipe(map(res => {
        return res;
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }
}
