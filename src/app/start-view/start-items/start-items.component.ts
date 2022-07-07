import { Component, OnInit, Input, OnChanges, Inject, HostBinding, SimpleChanges } from '@angular/core';
import { Content, ContentVideo } from '../../models/start-content.model';
import { Likes } from '../../models/likes.model';
import { Comment, CommentInterface, CommentParameter } from '../../models/comment.model';
import { Store } from '@ngrx/store';
import { selectLikes } from '../../models/store/likes/likes.selectors';
import { RootState } from '../../models/store/indexStore';
import { LikeHandleService } from '../../services/like-handle.service';
import { CommentsService } from '../../services/comments.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImagesComponent } from '../../modals/images/images.component';
import { Album } from '../../models/album.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-items',
  templateUrl: './start-items.component.html',
  styleUrls: ['./start-items.component.css']
})
export class StartItemsComponent implements OnInit {
  @Input() item: Content | ContentVideo;
  @Input() carrusel: Album[];
  comments: Comment[];
  like: Observable<Likes | null>;
  likesItem: User[];
  usuario: string;
  modalmood: string = "start";
  errMess: string;
  heart: boolean = false;
  commentLength: number = 0;
  playVideo: boolean = false;

  @HostBinding('attr.class') cssClass = 'row';
  constructor(
    @Inject('baseURL') public baseURL: string,
    private store: Store<RootState>,
    private likeService: LikeHandleService,
    private commentService: CommentsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    const mediaType = this.item.imageId! ? "imagen" : "video";
    this.comments = this.item.commento
    this.commentLength = this.item.commento.length;
console.log("this.item", this.item);

    this.like = this.store.select(selectLikes)

    this.store.select(state => state.likes)
      .subscribe(data => {
        let filterLikes = !data.likes ? null : data.likes
        if (mediaType === "imagen" && filterLikes) {
          this.heart = filterLikes.image.find(i => i === this.item.imageId!._id) ? true : false
        } else if (mediaType === "video" && filterLikes) {
          this.heart = filterLikes.image.find(i => i === this.item.videoId!._id) ? true : false
        }
      }, err => this.errMess = err)

    this.usuario = localStorage.getItem('CREDS')!.split('@')[0];
  }


  handleLike(imgID: string) {
    let img = imgID;
    var usersData = {
      id: localStorage.getItem('ID'),
      liked: img
    }
    const mediaType = this.item.imageId ? "imagen" : "video"
    if (mediaType === "imagen") {
      this.likeService.postLike(usersData)
        .subscribe(res => {
          return;
        }, err => this.errMess = err)

    } else {

      this.likeService.postLikeVideo(usersData)
        .subscribe(res => {
          return;
        }, err => this.errMess = err)
    }
  }
  play(event: any) {
    if (this.playVideo) event.target.pause();
    if (!this.playVideo) event.target.play();
    this.playVideo = !this.playVideo
  }
  endVideo() {
    this.playVideo = !this.playVideo
  }
  openDialog() {
    const dialogRef = this.dialog.open(ImagesComponent, {
      width: '90vw',
      height: '90vh',
      panelClass: 'custom-dialog-container'
    });
    dialogRef.componentInstance.moody = this.item;
    dialogRef.componentInstance.likestate = this.heart;
    dialogRef.componentInstance.moodstate = this.modalmood;

    const mediaType = this.item.imageId ? this.item.imageId._id : this.item.videoId!._id
    this.commentService.getComment(mediaType)
      .subscribe(com => {
        dialogRef.componentInstance.comentarios = com;
        dialogRef.componentInstance.commentsLoad = false;
      })


    const sub = dialogRef.componentInstance.newItemEvent.subscribe((image: string) => {

      this.handleLike(image)
    });
    const coomm = dialogRef.componentInstance.newCommentEvent.subscribe((comment: CommentParameter ) => {
      dialogRef.componentInstance.commentsLoad = true;
      dialogRef.componentInstance.comentarios = [];
      const commenta: CommentInterface = {
        comment: comment.commentValue,
        author: localStorage.getItem('ID')!,
        image: comment.imageId
      }
      this.commentService.postUserModalComment(commenta)
        .subscribe(res => {
          dialogRef.componentInstance.comentarios = res;
          dialogRef.componentInstance.commentsLoad = false;
          this.comments = res;
          this.commentLength = res.length;
        }, err => this.errMess = err)

    });
    const deletecoomm = dialogRef.componentInstance.deleteCommentEvent.subscribe((comment: string) => {

      dialogRef.componentInstance.commentsLoad = true;
      this.commentService.postDeleteComment(comment)
        .subscribe(res => {
          let test = [...this.comments]
          let indice = test.findIndex((comm:Comment) => comm._id === res._id)
          let deb = test.splice(indice, 1)

          dialogRef.componentInstance.comentarios = test
          dialogRef.componentInstance.commentsLoad = false;
          this.comments = test;
          this.commentLength = test.length;
        })
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
