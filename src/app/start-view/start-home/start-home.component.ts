import { Component, OnInit, HostBinding } from '@angular/core';
import { StartContentService } from '../../services/start-content.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../models/store/indexStore';
import { Content } from '../../models/start-content.model';
import { LikeHandleService } from '../../services/like-handle.service';
import { selectContent } from '../../models/store/startcontent/content.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-home',
  templateUrl: './start-home.component.html',
  styleUrls: ['./start-home.component.css']
})
export class StartHomeComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'container';
  content: Observable<Content[] | null>;
  errMess: string;
  constructor(private contentService: StartContentService,
    private store: Store<RootState>,
    private likeService: LikeHandleService) { }

  ngOnInit(): void {
    this.contentService.getTheStartWall()
      .subscribe(res => {
        return;
      }, err => this.errMess = err)
    this.likeService.fetchLikes(localStorage.getItem('ID')!)
      .subscribe(res => {
        return;
      }, err => this.errMess = err)

    this.content = this.store.select(selectContent)

  }

}
