import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../models/store/indexStore';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Likes } from '../../models/likes.model';
import { LikeHandleService } from '../../services/like-handle.service';
import { CommentsService } from '../../services/comments.service';
import { MatDialog } from '@angular/material/dialog';
import { ImagesComponent } from '../../modals/images/images.component';
import { ImagesWall } from '../../models/imageswall.model';
import { CommentInterface } from '../../models/comment.model';
import { commentsSuccessAction } from '../../models/store/comments/comment.actions';
import { selectUser } from '../../models/store/user/user.selectors';

import { WarningComponent } from '../../modals/warning/warning.component';
import { FileUploadService } from '../../services/file-upload.service';
import { ProfileImageComponent } from '../../modals/profile-image/profile-image.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  user: Observable< User | null>;
  album: ImagesWall[];
  carretel: ImagesWall[];
  like: Likes;
  comentarios: any;
  usuario: string;
  modalmood: string = "user";
  errMess: string;
  heart: boolean;
  file: File | null = null;
  myVideos:any = [];
  loadWallType: string;
  setIsFormatModalOpen: boolean;
  setIsTimeModalOpen: boolean;
  loadWall: File | null = null;
  duration: any;
  screenWidth: any;
  message: string;
  loadingFile: boolean = false;
  
  constructor(
    @Inject('baseURL') public baseURL:string,
    private window: Window,
    private userService: UsersService,
    private store: Store<RootState>,
    private likeService: LikeHandleService,
    private commentService: CommentsService,
    private fileUploadService: FileUploadService,
    public dialog: MatDialog,
    public dialogProfile: MatDialog,
    public dialogWarning: MatDialog) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.userService.userLogFetch()
      .subscribe(res => {
        return;
      }, err => this.errMess = err)

    this.user = this.store.select(selectUser)

        this.store.select(state => state.user)
          .subscribe(info => {
            let checkUser = !info.user ? null : info.user;
            this.album = !checkUser ? null : checkUser.imagesWall
            this.carretel = !checkUser ? null : checkUser.videosWall
      }, err => this.errMess = err)

    this.likeService.fetchLikes(localStorage.getItem('ID')!)
      .subscribe(res => {
        return;
      }, err => this.errMess = err)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.screenWidth = window.innerWidth;
  }

  setFileInfo(event:any) {

    let idfoto = event.target.id
    this.myVideos.length = 0;
    this.loadWallType = idfoto
    if (idfoto === "story") {

      let files = !event.target.files[0] ? null : event.target.files[0];
      let mediaType = !files ? null : files.type.split('/')[0]
      if (mediaType === "image") this.handleWallimg(event)
      if (mediaType === "video") this.wallvid(event)
    } else if (idfoto === "video") {
      this.wallvid(event)
    } else if (idfoto === "imagen") {
      this.handleWallimg(event);
    }
  }

  handleWallimg(event:any) {
    let loadingImgWall = !event.target.files[0] ? null : event.target.files[0];
    let loadingType = !loadingImgWall ? null : loadingImgWall.type.split('/')[0]
    if (loadingType === "video") {
      this.setIsFormatModalOpen = true;
      this.message = "It is not a picture. Try with other button."
      this.openWarningModal()
    } else {
      this.loadWall = loadingImgWall;
      this.duration = 12000
    }

  }

  wallvid(event:any) {
    var files = !event.target.files[0] ? null : event.target.files[0];
    let loadingType = !files ? null : files.type.split('/')[0];
    if (loadingType === "video") {
      this.myVideos.push(files);
      var video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        var duration = video.duration;
        this.myVideos[this.myVideos.length - 1].duration = duration;
        this.handleWallvid(event);
      }
      video.src = URL.createObjectURL(files);
    } else {
      this.message = "It is not a video. Try with other button."
      this.setIsFormatModalOpen = true;
      this.openWarningModal()
    }
  }
  handleWallvid(event:any) {
    var testing = this.myVideos[0].duration;
    if (testing <= 60) {
      let loadingImgWall = event.target.files[0];
      this.loadWall = loadingImgWall
      this.duration = testing * 1000
    } else {
      this.message = "This video is too long. Pick a video that length less than 1 minute."
      this.setIsTimeModalOpen = true;
      this.openWarningModal()
    }
  }
  handleWallSubmit = () => {
    this.loadingFile = true;
    if (this.loadWallType === "video" || this.loadWallType === "imagen") {
      this.fileUploadService.uploadImageWall(this.loadWall)
        .subscribe((f) => {
          this.window.location.reload()
        });
    }
    if (this.loadWallType === "story") {
      this.fileUploadService.uploadStory(this.loadWall, this.duration)
        .subscribe((f) => {
          this.window.location.reload()
        });
    }
  }

  hendleCommentPost(values: string, imgId: string) {
    const commenta: CommentInterface = {
      comment: values,
      author: localStorage.getItem('ID')!,
      image: imgId
    }

    this.commentService.postComment(commenta)
      .subscribe(res => {
        this.comentarios = res
      })
  }
  onUpload() {
    this.fileUploadService.uploadImageWall(this.file)
      .subscribe(image => {
        window.location.reload();
      }
      );
  }

  openProfileModal() {
    const dialogRef = this.dialogProfile.open(ProfileImageComponent, {
      width: '500px',
      height: '450px',
      panelClass: 'custom-dialog-container'
    });
this.user.subscribe(u =>{
  dialogRef.componentInstance.profileImage = u!.image;

})
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log("login modal", result);
      });

    const uploadImage = dialogRef.componentInstance.newUploadEvent.subscribe((image: File) => {

      this.fileUploadService.uploadProfileImage(image)
        .subscribe(image => {
          window.location.reload();
        }, err => this.errMess = err)
    });
  }

  openDialog(parte:any, type:any) {
    const dialogRef = this.dialog.open(ImagesComponent, {
      width: '90vw',
      height: '90vh',
      panelClass: 'custom-dialog-container'
    });
    if (type === "imagen") dialogRef.componentInstance.carrousel = this.album;
    if (type === "video") dialogRef.componentInstance.carrousel = this.carretel;
    dialogRef.componentInstance.moody = parte;
    dialogRef.componentInstance.moodstate = this.modalmood;
    dialogRef.componentInstance.mediaType = type;

    let indexImg = this.album.findIndex(i => i === parte)
    if (indexImg === 0) dialogRef.componentInstance.back = false;
    if (indexImg === this.album.length - 1) dialogRef.componentInstance.forth = false;
    if (this.album.length === 1) {
      dialogRef.componentInstance.forth = false;
      dialogRef.componentInstance.back = false;
    }

    let indexVideo = this.carretel.findIndex(i => i === parte)
    if (indexVideo === 0) dialogRef.componentInstance.back = false;
    if (indexVideo === this.carretel.length - 1) dialogRef.componentInstance.forth = false;
    if (this.carretel.length === 1) {
      dialogRef.componentInstance.forth = false;
      dialogRef.componentInstance.back = false;
    }

    this.commentService.getComment(parte._id)
      .subscribe(com => {
        dialogRef.componentInstance.comentarios = com;
        dialogRef.componentInstance.commentsLoad = false;
      })

    const coomm = dialogRef.componentInstance.newCommentEventUserComponent.subscribe((comment: any) => {

      dialogRef.componentInstance.commentsLoad = true;
      const commenta: CommentInterface = {
        comment: comment.commentValue,
        author: localStorage.getItem('ID')!,
        image: comment.imageId
      }
      this.commentService.postUserModalComment(commenta)
        .subscribe(res => {
          return;
        }, err => this.errMess = err)
      this.store.select(c => c.comments)
        .subscribe(res => {
          dialogRef.componentInstance.comentarios = res.comments;
          dialogRef.componentInstance.commentsLoad = false
        })
    });

    const deletecoomm = dialogRef.componentInstance.deleteCommentEvent.subscribe((comment: string) => {

      this.commentService.postDeleteComment(comment)
        .subscribe(res => {
          let commentResult = dialogRef.componentInstance.comentarios!.filter(c => c._id != res._id)
          this.comentarios = commentResult;
          dialogRef.componentInstance.comentarios = commentResult;
          this.store.dispatch(commentsSuccessAction({comments: commentResult}));
        })
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openWarningModal() {
    const dialogRef = this.dialogWarning.open(WarningComponent, {
      width: '350px',
      height: '250px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.componentInstance.warning = this.message;
    dialogRef.afterClosed()
      .subscribe(result => {
        this.message = "";
      });

  }

}
