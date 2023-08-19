import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  @Input()
  likes: User[] = [];
  @Output() closeDialogsEvent = new EventEmitter();
  usuario!: string;
  constructor(@Inject('baseURL') public baseURL:string) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('CREDS')!.split('@')[0];
  }
  closeDialogs(){
    this.closeDialogsEvent.emit()
  }
}
