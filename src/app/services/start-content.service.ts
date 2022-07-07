import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../models/store/indexStore';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Content } from './../models/start-content.model';
import { contentAction, contentErrorAction, contentSuccessAction } from '../models/store/startcontent/content.actions'

@Injectable({
  providedIn: 'root'
})
export class StartContentService {
  constructor(private http: HttpClient,
    private store: Store<RootState>,
    private processHTTPMsgService: ProcessHttpmsgService) { }

  getTheStartWall(): Observable<Content[] | any> {
    this.store.dispatch(contentAction());
    const id = localStorage.getItem('ID')
    return this.http.get<Content[] | any>(baseURL + 'start/publications/' + id)
      .pipe(map(res => {
        this.store.dispatch(contentSuccessAction({content: res}));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }

  sendData() {
    this.getTheStartWall()
      .subscribe(res => {
        this.store.dispatch(contentSuccessAction({content: res}));
      })
  }

}
