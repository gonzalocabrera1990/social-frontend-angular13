import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FollowService } from '../../services/follow.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../models/store/indexStore';
import { selectStories } from '../../models/store/stories/stories.selectors';

@Component({
  selector: 'app-start-story',
  templateUrl: './start-story.component.html',
  styleUrls: ['./start-story.component.css']
})
export class StartStoryComponent implements OnInit {
  @ViewChild('scrollStoriesContent')
  scrollStoriesContent!: ElementRef;
  stories!: Observable<any>;
  errMess!: string;
  constructor(private followService: FollowService,
    @Inject('baseURL') public baseURL:string,
    private store: Store<RootState> ) { }

  ngOnInit() {
    this.stories = this.store.select(selectStories)
}
scrollLeft(){
  this.scrollStoriesContent.nativeElement.scrollLeft -= 150;
}

scrollRight(){
  this.scrollStoriesContent.nativeElement.scrollLeft += 150;
}

}
