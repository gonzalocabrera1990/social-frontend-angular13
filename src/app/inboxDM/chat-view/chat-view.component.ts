import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Following } from 'src/app/models/following.model';
import { Inbox, Talking } from 'src/app/models/inbox.model';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  @Input()
  maintalk!: Inbox | null;
  @Input()
  newTalkStatus!: boolean;
  @Input()
  newTalkUser!: Following | null;
  @Output() sendMessageEvent = new EventEmitter<Talking>();
  @ViewChild('cform') commentFormDirective: any;
  commentForm!: FormGroup;
  public storage: string = localStorage.getItem("ID")!;
  usuario!: string;

  constructor(private fb: FormBuilder, @Inject('baseURL') public baseURL:string) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('CREDS')!.split('@')[0];
    this.createForm();
  }
  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log("this.commentForm.value", this.commentForm.value);

    if (this.newTalkStatus) {
      
      
      let talking: Talking = {
        message: this.commentForm.value,
        talk: {
          room: "",
          _id: null
        },
        receptor: this.newTalkUser!.id._id
      }
      this.sendMessageEvent.emit(talking);
    } else {
      let getReceptor = this.maintalk!.members.userOne._id === this.storage ?
        this.maintalk!.members.userTwo._id :
        this.maintalk!.members.userOne._id
        
      let talking: Talking  = {
        message: this.commentForm.value,
        talk: this.maintalk,
        receptor: getReceptor
      }
      this.sendMessageEvent.emit(talking);
    }
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      comment: ''
    });
  }


}
