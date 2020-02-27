import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from '../entity/user';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {FCM} from '@ionic-native/fcm/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

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
              private fcm: FCM,
              private vibration: Vibration,
              private localNotifications: LocalNotifications,
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
      this.constant.alert('you must set a username');
      return;
    }
    if (this.user.username.length < 5) {
      this.constant.alert('username must have at least 5 characters');
      return;
    }
    if (this.user.username.length > 15) {
      this.constant.alert('username must not more than 15 characters');
      return;
    }
    if (this.user.password == null || this.user.password === '') {
      this.constant.alert('you must set a password');
      return;
    }
    if (this.user.password.length < 6) {
      this.constant.alert('password must have at least 6 characters');
      return;
    }
    if (this.user.password.length > 20) {
      this.constant.alert('password must not more than 20 characters');
      return;
    }
    if (!this.user.password.match('[!@#$%^&*()~`,.<>?/:;\'\"{}\[\]|\\]')) {
      this.constant.alert('password must contain at least one special character: @ , . $ *');
      return;
    }
    if (!this.user.password.match('[a-z]')) {
      this.constant.alert('password must contain at least one lower case character');
      return;
    }
    if (!this.user.password.match('[A-Z]')) {
      this.constant.alert('password must contain at least one Upper case character');
      return;
    }
    if (this.user.password !== this. repeatPassword) {
      this.constant.alert('your password and repeatPassword is different');
      return;
    }
    if (this.user.email == null || this.user.email === '') {
      this.constant.alert('you must set a email');
      return;
    }
    if (!this.user.email.match('@')) {
      this.constant.alert('email format is wrong');
      return;
    }
    if (this.user.phone == null || this.user.phone === '') {
      this.constant.alert('you must set a phone');
      return;
    }
    if (!(this.user.phone.match('[+][0-9]') || this.user.phone.match('[0-9]')) || this.user.phone.length < 7 ) {
      this.constant.alert('you must set a right phone number');
      return;
    }
    if (this.constant.getUser() == null || this.constant.getUser().role == null || this.constant.getUser().role === '') {
      this.http.post(this.constant.baseUrl + '/user/signup', this.user).subscribe(res => {
        if ((res as any).code !== 0) {
          this.constant.alert((res as any).message);
          return;
        }
        this.constant.setUser((res as any).result);
        localStorage.setItem('uid', this.constant.getUser().id);
        this.getToken();
        this.initSetting();
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
          this.constant.alert((res as any).message);
          return;
        }
        this.constant.setUser((res as any).result);
        localStorage.setItem('uid', this.constant.getUser().id);
        this.getToken();
        this.initSetting();
        this.router.navigate(['/tabs/me']);
      });
    }
  }

  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
      if (this.constant.getUser() != null && this.constant.getUser().id != null && this.constant.getUser().id !== '') {
        this.http.post(this.constant.baseUrl + '/fcm/register', {
          userId: this.constant.getUser().id,
          fcmToken: token
        }).subscribe( res => {});
      }
    });
  }

  initSetting() {
    this.http.post(this.constant.baseUrl + '/setting/init', {
      userId: this.constant.getUser().id
    }).subscribe( res => {
      this.constant.setSetting((res as any).result);
      if ( this.constant.getSetting().notification == null || this.constant.getSetting().notification === ''
          || this.constant.getSetting().notification === 'true') {
        if (this.constant.getSetting().vibration == null || this.constant.getSetting().vibration === ''
            || this.constant.getSetting().vibration === 'true') {
          this.vibration.vibrate(1500);
        }
        this.localNotifications.schedule({
          id: 2,
          title: 'Welcome',
          text: 'Hi, ' + this.constant.getUser().username + '. Have a good day'
        });
      }
    });
  }
}

