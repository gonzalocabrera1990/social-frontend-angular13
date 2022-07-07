import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { inboxAction, inboxSuccessAction } from '../models/store/inbox/inbox.actions';

import { RootState } from '../models/store/indexStore';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Inbox } from '../models/inbox.model';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient, private socket: Socket,
    private store: Store<RootState>,
    private processHTTPMsgService: ProcessHttpmsgService
  ) { }
  currentDocument = this.socket.fromEvent<Inbox>('chatNotification')
  socketconection(socketInfo: any) {
    this.socket.emit('usernameAngular', socketInfo)
    return new Observable<any>(observer => {
      this.socket.on('returnUsernameAngular', (data: any) => {
        return observer.next(data)
      })
    })
  }

  inboxFetch(): Observable<Inbox[]> {
    this.store.dispatch(inboxAction());
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const id = localStorage.getItem('ID')
    return this.http.get<Inbox[] | any>(baseURL + `inbox-message/getch/${id}`, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(inboxSuccessAction({ inbox: res }));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }
  talkFetch(datos: any) {
    let data = {
      query: datos._id,
      usuario: localStorage.getItem("ID"),
      room: datos.room
    }
    this.socket.emit("fetchChat", data);

    return new Observable<any>(observer => {
      this.socket.on('sendChat', (data: Inbox) => {

        return observer.next(data)
      })
    })
  }

  inboxTalksHandler(datos: any, user: string) {
    let data = {
      query: datos.query,
      usuario: datos.usuario,
      room: datos.room
    }
    this.socket.emit("fetchChat", data);

    return new Observable<any>(observer => {
      this.socket.on('sendChat', (data: Inbox) => {
        return observer.next(data)
      })
    })
  }

  sendMessage(datad: any) {
    this.socket.emit('sendMessage', datad)
    return new Observable<any>(observer => {
      this.socket.on('sendChat', (data: Inbox) => {
        return observer.next(data)
      })
    })
  }

  cleanRoom(id: string) {
    this.socket.emit('clean-room', id)
  }

}
