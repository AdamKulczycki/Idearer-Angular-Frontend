import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') LoginForm: NgForm;
  public user: any = {
    username: '',
    password: ''
  };

  constructor(private authSrv: AuthService,
    private storageSrv: StorageService,
    private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  login(): void {
    this.user.username = this.LoginForm.value.userData.username;
    this.user.password = this.LoginForm.value.userData.password;

    this.authSrv.signIn(this.user.username, this.user.password).subscribe(
      (res) => {
        this.storeUser(res);
        this.navToHome();
        this.authSrv.setIsLogged(true);
        this.adminService.checkIfAdmin();
        this.toastr.success('Logged In!');
      },
      (err) => {
        if (err.code === 400) {
          this.toastr.error('Wrong Credentials');
        } else {
          this.toastr.error(err.error.error);
        }
      }
    );
  }

  private storeUser(response) {
    const { access_token, userId, userName, refresh_token } = response;

    this.storageSrv.set('access_token', access_token);
    this.storageSrv.set('id', userId);
    this.storageSrv.set('username', userName);
    this.storageSrv.set('refresh_token', refresh_token);
  }

  private navToHome() {
    this.router.navigateByUrl('');
  }
}
