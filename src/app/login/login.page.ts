import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Router} from '@angular/router';
import {url} from '@angular-devkit/schematics';
import {FCM} from '@ionic-native/fcm/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private fcm: FCM,
              private vibration: Vibration,
              private localNotifications: LocalNotifications,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username == null || this.username === '') {
      alert('you must set a username');
      return;
    }
    if (this.password == null || this.password === '') {
      alert('you must set a password');
      return;
    }
    this.http.post(this.constant.baseUrl + '/user/login', {
      username: this.username,
      password: this.password,
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.constant.setUser((res as any).result);
      localStorage.setItem('uid', this.constant.getUser().id);
      this.getToken();
      this.initSetting();
      this.router.navigate(['/tabs/me']);
    });
  }

  jumpToSignup() {
    this.router.navigate(['tabs/me/signup']);
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
