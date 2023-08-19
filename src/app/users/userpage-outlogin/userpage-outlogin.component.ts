import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-userpage-outlogin',
  templateUrl: './userpage-outlogin.component.html',
  styleUrls: ['./userpage-outlogin.component.css']
})
export class UserpageOutloginComponent implements OnInit {
  username!: string | null;
  usuario!: string | null;
  errMess!: string | null;
  user: any;
  private storage: string | null = localStorage.getItem("ID");
  constructor(
    @Inject('baseURL') public baseURL:string,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get("username");

      this.userService.userOutlogingFetch(this.username!)
        .subscribe(res => {
          this.user = [res];
        }, err => this.router.navigate(['login']))
    });
  }
}
