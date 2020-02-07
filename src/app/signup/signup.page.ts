import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from '../entity/user';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  username: string;
  password: string;
  email: string;
  phone: string;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.http.post(this.constant.baseUrl + '/user/signup', {
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      role: 'USER'
    }).subscribe(res => {
      console.log(res);
      this.constant.setUser((res as any).result, this.username);
    });
    this.router.navigate(['/tabs/me']);
  }
}

