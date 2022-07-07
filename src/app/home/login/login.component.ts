import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginupComponent } from '../../modals/loginup/loginup.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openLoginForm() {
    const loginRef = this.dialog.open(LoginupComponent, { width: '500px', height: '450px' });

    loginRef.afterClosed()
      .subscribe(result => {
        console.log("login modal", result);
      });
  }
}
