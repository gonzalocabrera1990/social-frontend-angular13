import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-loginup',
  templateUrl: './loginup.component.html',
  styleUrls: ['./loginup.component.css']
})
export class LoginupComponent implements OnInit {
  loadingLogin: boolean = true;
  user = { username: '', password: '', remember: false };
  errMess: string = '';
  constructor(public dialogRef: MatDialogRef<LoginupComponent>, public router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.loadingLogin = false;
    this.errMess = "" ;
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);
          this.router.navigate(['home']);
        } 
      },
        error => {
          this.loadingLogin = true;
          this.errMess = error;
        });
  }

}
