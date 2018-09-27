import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user-model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') RegisterForm: NgForm;

  constructor(private authSrv: AuthService) { }

  user = {
    email: '',
    password: '',
    username: ''
  }

  newUser = new User(this.user);

  ngOnInit() {
  }

  register() {
    this.user.email = this.RegisterForm.value.userData.email;
    this.user.password = this.RegisterForm.value.userData.password;
    this.user.username = this.RegisterForm.value.userData.username;
    this.newUser = new User(this.user);
    
    console.log(this.newUser);
    
    this.authSrv.signUp(this.newUser).subscribe(
      (response) => {
        console.log(response);
      }, 
      (err) => {
        console.log(err);
      }
    );
  }

}
