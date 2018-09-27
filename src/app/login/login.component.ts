import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') LoginForm: NgForm;

  constructor() { }

  user = {
    email: '',
    id: undefined,
    password: '',
    username: ''
  }

  newUser = new User(this.user);

  ngOnInit() {
  }

  login() {
    
  }

}
