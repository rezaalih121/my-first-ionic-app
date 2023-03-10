import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicAuthService } from '../services/ionic-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userDetail!: string;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService
  ) {}

  ngOnInit() {
    this.ionicAuthService.userDetails().subscribe(
      (response) => {
        if (response !== null) {
          this.userDetail =
            'UID : ' +
            response.uid +
            ' ||| U_refreshToken ==>> ' +
            response.refreshToken +
            ' ||| getIdToken ==>  ' +
            response.getIdToken;
        } else {
          this.router.navigateByUrl('');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signOut() {
    this.ionicAuthService
      .signoutUser()
      .then((res) => {
        this.router.navigateByUrl('login');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
