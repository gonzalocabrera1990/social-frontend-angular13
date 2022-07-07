import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FollowService } from '../../services/follow.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../models/store/indexStore';
import { Following } from 'src/app/models/following.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-follow-view',
  templateUrl: './follow-view.component.html',
  styleUrls: ['./follow-view.component.css']
})
export class FollowViewComponent implements OnInit {
  @Input() follows: Observable< Following[] | null >;
  @Output() selectTalkEvent = new EventEmitter<string>();
  errMess: string;
  constructor(private followService: FollowService, private store: Store<RootState>,
    @Inject('baseURL') public baseURL:string) { }

  ngOnInit() { }

  selectTalk(talk: string) {
    this.selectTalkEvent.emit(talk);
  }

}
