import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RootState } from '../models/store/indexStore';
import { loginAction, loginSuccessAction } from '../models/store/auth/auth.actions';

import { User } from '../models/user.model';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { UsersService } from './users.service';
import { InboxService } from './inbox.service';

interface AuthResponse {
  status: string | null;
  success: string | null;
  token: string | null;
  userdata: User | any;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey = 'JWT';
  creds = 'CREDS';
  id = 'ID';
  img = 'IMG';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = '';

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    private store: Store<RootState>,
    private router: Router,
    private userService: UsersService,
    private inboxService: InboxService) {
  }

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
      .subscribe(res => {
        this.sendUsername(res.user.username);
      },
        err => {
          this.destroyUserCredentials();
        });
  }

  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next('');
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey) || '');
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }
    }
  }

  storeUserCredentials(credentials: any) {
    localStorage.setItem(this.tokenKey, credentials.token);
    localStorage.setItem(this.creds, credentials.username);
    localStorage.setItem(this.id, credentials.res.userdata._id);
    localStorage.setItem(this.img, credentials.res.userdata.image.filename);
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = '';
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  signUp(signUpData:any): Observable<any> {
    const newUser = {
      username: signUpData.email,
      password: signUpData.password,
      date: signUpData.date,
      sex: signUpData.gender,
      country: signUpData.country
    };
   
    return this.http.post<any>(baseURL + 'users/signup', newUser)
    .pipe(map(res => {
      return res
    })
    ,catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  logIn(user: any): Observable<any> {
    this.store.dispatch(loginAction());
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      { 'username': user.username, 'password': user.password })
      .pipe(map(res => {
        this.storeUserCredentials({ username: user.username, res: res, token: res.token });
        this.store.dispatch(loginSuccessAction({user: res.userdata}));
        this.userService.userLogFetch()
        .subscribe(res => {
          return;
        })
        this.userService.fetchNotifications()
        .subscribe(res => {
          return;
        })
        this.inboxService.inboxFetch()
        .subscribe(res => {
          return;
        })
        return { 'success': true, 'username': user.username };
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    const status = localStorage.getItem('JWT') ? true : false
    if (status) {
      return true
    } else {
      return false
    }
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): any {
    const bearer = localStorage.getItem('JWT');
    return bearer;
  }
}
