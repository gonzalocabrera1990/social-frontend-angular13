import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../models/store/indexStore';
import { LikesComponent } from '../../modals/likes/likes.component';

import { Comment } from '../../models/comment.model';
import { CommentsService } from '../../services/comments.service';
import { LikeHandleService } from '../../services/like-handle.service';
import { FileUploadService } from '../../services/file-upload.service';
import { CommentInterface } from '../../models/comment.model';
import { commentsAction, commentsSuccessAction } from '../../models/store/comments/comment.actions';

@Component({
  selector: 'app-image-view-responsive',
  templateUrl: './image-view-responsive.component.html',
  styleUrls: ['./image-view-responsive.component.css']
})
export class ImageViewResponsiveComponent implements OnInit {
  data: any;
  likes: any = [];
  likeStatus: any;
  comments!: Comment[] | null;
  mediaType!: string;
  likestate!: boolean;
  playVideo: boolean = false;
  deleteImageStatus!: boolean;
  loading: boolean = false;
  errMess!: string;
  public storage: string | null = localStorage.getItem("ID");
  @ViewChild('cform') commentFormDirective: any;
  commentForm!: FormGroup;
  constructor(@Inject('baseURL') public baseURL: string,
    private window: Window,
    private readonly location: Location,
    private router: Router,
    private store: Store<RootState>,
    private serve: UsersService,
    private likeService: LikeHandleService,
    private commentService: CommentsService,
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let user = localStorage.getItem("ID");
    this.createForm();
    this.route.paramMap.subscribe(params => {
      let usuario = params.get("idimg");
      this.serve.getImage(usuario!)
      .subscribe( img => {
        
        let likesFilter = img.likes.some((i: any) => i._id === user);
        let type = img.filename.split('#')[1]
        this.data = img;
        this.likes = img.likes;
        this.likeStatus = likesFilter;
        this.mediaType = type ? 'video' : 'imagen' ;
        this.deleteImageStatus =  img.userData._id === user
        this.loading = true;
      })
      this.commentService.getComment(usuario!)
      .subscribe( comm => {
        this.comments = comm;
      })
    });
    
  }
   play(event: any){
    if(this.playVideo) event.target.pause();
    if(!this.playVideo) event.target.play();
    this.playVideo = !this.playVideo
  }
  endVideo(){
    this.playVideo = !this.playVideo
  }
  handleLikeUserComponent() {
    let img = this.data._id;
    let userId = localStorage.getItem('ID');
    var usersData = {
        id: userId,
        liked: img
    }
    
    if(this.mediaType === "imagen"){
        this.likeService.postLike(usersData)
        .subscribe(res => {
          this.likeStatus = res.image.find(i=> i === img) ? true : false
          this.getItemLikesUserComponent()
        }, err => this.errMess = err)

    } else if(this.mediaType === "video") {

      this.likeService.postLikeVideo(usersData)
      .subscribe(res => {
        this.likeStatus = res.image.find(i=> i === img) ? true : false
        this.getItemLikesUserComponent()
      }, err => this.errMess = err)
    }
  }

  getItemLikesUserComponent() {
    if(this.mediaType === "imagen"){
      this.likeService.fetchImagesLikes(this.data._id)
      .subscribe(res => {
        this.likes = res;
      }, err => this.errMess = err)
    } else if(this.mediaType === "video"){
      this.likeService.fetchVideosLikes(this.data._id)
      .subscribe(res => {
        this.likes = res;
      }, err => this.errMess = err)
    }
  }

  openLoginForm() {
    const loginRef = this.dialog.open(LikesComponent, { width: '500px', height: '450px', panelClass: 'custom-dialog-likes' });
    loginRef.componentInstance.likes = this.likes
    const coomm = loginRef.componentInstance.closeDialogsEvent.subscribe(() => {
      this.dialog.closeAll()
    })
    loginRef.afterClosed()
      .subscribe(result => {
        console.log("login modal");
      });
  }
  onSubmitUserComponent() {
    const commenta: CommentInterface = {
      comment: this.commentForm.value.comment,
      author: localStorage.getItem('ID')!,
      image: this.data._id
  }
  this.commentService.postUserModalComment(commenta)
  .subscribe(res => {
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      comment: ''
    });
  }, err => this.errMess = err)
  this.store.select(c => c.comments)
      .subscribe(res =>{
        this.comments = res.comments;
      })
  }
  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }
  deleteComment(commentId:string) {
    this.commentService.postDeleteComment(commentId)
      .subscribe(res =>{
        let commentResult = this.comments!.filter(c => c._id != res._id)
        this.comments = commentResult;
        this.store.dispatch(commentsSuccessAction({comments: commentResult}));
        return false;
      })
    }
  deletePhotograph (){
    this.loading = false;
      var config = {
        userid: localStorage.getItem("ID")!,
        imageid: this.data._id
      }
      if( this.mediaType === "imagen"){
        this.fileUploadService.removePhotograph(config)
        .subscribe(res=>{
          this.router.navigate(['userpage']);
        })
      } else {
        this.fileUploadService.removeVideo(config)
        .subscribe(res=>{
          this.router.navigate(['userpage']);
          })
      }
  
    }
  goBack(){
    this.location.back();
  }

}
