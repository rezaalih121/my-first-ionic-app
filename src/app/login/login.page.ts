import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicAuthService } from '../services/ionic-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  successMsg: string = '';
  errorMsg: string = '';
  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService
  ) {}
  signIn(value: any) {
    this.ionicAuthService.signinUser(value).then(
      (response) => {
        console.log(response);
        this.errorMsg = '';
        this.router.navigateByUrl('dashboard');
      },
      (error) => {
        this.errorMsg = error.message;
        this.successMsg = '';
      }
    );
  }
  ngOnInit() {}
}
