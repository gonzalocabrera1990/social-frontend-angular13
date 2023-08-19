import { Component, Inject, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {
  @Input()
  profileImage!: Image;
  @Output() newUploadEvent = new EventEmitter<File | null>();
  file:File | null = null;
  imageShowen: any = null;
  loadingProfileImage: boolean = false;

  constructor(@Inject('baseURL') public baseURL:string,
  public dialogRef: MatDialogRef<ProfileImageComponent>) { }

  ngOnInit(): void {
  }
  onChangeImageUpload(event:any) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    this.imageShowen = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imageShowen = reader.result; 
    }
  }
  cleanInput() {
    this.imageShowen = null;
    this.file = null;
    this.dialogRef.close()
   }
  onUpload() {
    this.loadingProfileImage = true;
    this.newUploadEvent.emit(this.file);
  }

}
