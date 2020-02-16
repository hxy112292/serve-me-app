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

  user: User;
  repeatPassword: any;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router) {
    this.user = {
      id: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: 'USER'
    };
  }

  ngOnInit() {
  }

  signup() {
    if (this.user.username == null || this.user.username === '') {
      alert('you must set a username');
      return;
    }
    if (this.user.username.length < 5) {
      alert('username must have at least 5 letters');
      return;
    }
    if (this.user.password == null || this.user.password === '') {
      alert('you must set a password');
      return;
    }
    if (this.user.password.length < 6) {
      alert('password must have at least 6 digits');
      return;
    }
    if (this.user.password !== this. repeatPassword) {
      alert('your password and repeatPassword is different');
      return;
    }
    if (this.user.email == null || this.user.email === '') {
      alert('you must set a email');
      return;
    }
    if (!this.user.email.match('@')) {
      alert('email format is wrong');
      return;
    }
    if (this.user.phone == null || this.user.phone === '') {
      alert('you must set a phone');
      return;
    }
    if (!(this.user.phone.match('[+][0-9]') || this.user.phone.match('[0-9]')) || this.user.phone.length < 7 ) {
      alert('you must set a right phone number');
      return;
    }
    if (this.constant.getUser() == null || this.constant.getUser().role == null || this.constant.getUser().role === '') {
      this.http.post(this.constant.baseUrl + '/user/signup', this.user).subscribe(res => {
        if ((res as any).code !== 0) {
          alert((res as any).message);
          return;
        }
        this.constant.setUser((res as any).result);
        localStorage.setItem('uid', this.constant.getUser().id);
        this.router.navigate(['/tabs/me']);
      });
    } else if (this.constant.getUser().id != null && this.constant. getUser().id !== '' &&
        this.constant.getUser() != null && this.constant.getUser().role === 'GUEST') {
      this.constant.getUser().phone = this.user.phone;
      this.constant.getUser().email = this.user.email;
      this.constant.getUser().password = this.user.password;
      this.constant.getUser().username = this.user.username;
      this.constant.getUser().role = 'USER';
      this.http.put(this.constant.baseUrl + '/user/update', this.constant.getUser()).subscribe(res => {
        if ((res as any).code !== 0) {
          alert((res as any).message);
          return;
        }
        this.constant.setUser((res as any).result);
        localStorage.setItem('uid', this.constant.getUser().id);
        this.router.navigate(['/tabs/me']);
      });
    }
  }
}

