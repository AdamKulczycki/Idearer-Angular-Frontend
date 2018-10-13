import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') LoginForm: NgForm;

  constructor(private authSrv: AuthService, private storageSrv: StorageService, private router: Router) { }

  user = {
    username: '',
    password: ''
  };

  ngOnInit() {
  }

  login() {
    this.user.username = this.LoginForm.value.userData.username;
    this.user.password = this.LoginForm.value.userData.password;

    this.authSrv.signIn(this.user.username, this.user.password).subscribe(
      (res) => {
        this.storeUser(res);
        this.navToHome();
        this.authSrv.isLogged.next(true);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private storeUser(response) {
    const { access_token } = response;

    this.storageSrv.set('access_token', access_token);
    this.storageSrv.set('username', this.user.username);
  }

  private navToHome() {
    this.router.navigateByUrl('');
  }
}
