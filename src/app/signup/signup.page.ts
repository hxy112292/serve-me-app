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
  showUsernameRule: boolean;
  showPasswordRule: boolean;
  privacyAgree: boolean;
  alertTitle: string;
  alertMessage: string;
  alertNameMessage: string;
  alertPassMessage: string;
  alertEmailMessage: string;
  alertPhoneMessage: string;
  alertPrivacyMessage: string;

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

    this.alertTitle = '';
    this.alertMessage = '';
    this.alertEmailMessage = '';
    this.alertNameMessage = '';
    this.alertPassMessage = '';
    this.alertPhoneMessage = '';
    this.alertPrivacyMessage = '';
  }

  ngOnInit() {
  }

  signup() {

    this.UsernameCheck();
    this.PasswordCheck();
    this.EmailCheck();
    this.PhoneCheck();
    this.PrivacyCheck();

    if (this.alertNameMessage !== '' && this.alertNameMessage != null) {
      this.alertMessage += '<br>USERNAME ERROR:<br>';
      this.alertMessage += this.alertNameMessage;
    }
    if (this.alertPassMessage !== '' && this.alertPassMessage != null) {
      this.alertMessage += '<br>PASSWORD ERROR:<br>';
      this.alertMessage += this.alertPassMessage;
    }
    if (this.alertEmailMessage !== '' && this.alertEmailMessage != null) {
      this.alertMessage += '<br>EMAIL ERROR:<br>';
      this.alertMessage += this.alertEmailMessage;
    }
    if (this.alertPhoneMessage !== '' && this.alertPhoneMessage != null) {
      this.alertMessage += '<br>PHONE ERROR:<br>';
      this.alertMessage += this.alertPhoneMessage;
    }
    if (this.alertPrivacyMessage !== '' && this.alertPrivacyMessage != null) {
      this.alertMessage += '<br>PRIVACY ERROR<br>';
      this.alertMessage += this.alertPrivacyMessage;
    }
    if (this.alertMessage !== '' && this.alertMessage != null) {
      this.constant.alert(this.alertMessage);
      this.initAllAlert();
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

  initAllAlert() {
    this.alertTitle = '';
    this.alertMessage = '';
    this.alertEmailMessage = '';
    this.alertNameMessage = '';
    this.alertPassMessage = '';
    this.alertPhoneMessage = '';
    this.alertPrivacyMessage = '';
  }

  UsernameCheck() {
    if (this.user.username == null || this.user.username === '') {
      this.alertNameMessage += '● username is empty<br>';
    }
    if (this.user.username.length < 5 || this.user.username.length > 15) {
      this.alertNameMessage += '● username has not 5-15 characters<br>';
    }
    if (this.user.username.match('[!@#$%^&*()~`,.<>?/:;\'\"{}\[\]|\\]')) {
      this.alertNameMessage += '● username only support alphabet and number<br>';
    }
  }

  PasswordCheck() {
    if (this.user.password == null || this.user.password === '') {
      this.alertPassMessage += '● password is empty<br>';
    }
    if (this.user.password.length < 6 || this.user.password.length > 20) {
      this.alertPassMessage += '● password has not 6-20 characters<br>';
    }
    if (!this.user.password.match('[!@#$%^&*()~`,.<>?/:;\'\"{}\[\]|\\]')) {
      this.alertPassMessage += '● password has not special character: @ , . $ *<br>';
    }
    if (!this.user.password.match('[a-z]')) {
      this.alertPassMessage += '● password has not lowercase<br>';
    }
    if (!this.user.password.match('[A-Z]')) {
      this.alertPassMessage += '● password has not uppercase<br>';
    }
    if (this.user.password !== this. repeatPassword) {
      this.alertPassMessage += '● password and repeatPassword is different<br>';
    }
  }

  EmailCheck() {
    if (this.user.email == null || this.user.email === '') {
      this.alertEmailMessage += '● email is empty<br>';
    }
    if (!this.user.email.match('@')) {
      this.alertEmailMessage += '● email format is wrong<br>';
    }
  }

  PhoneCheck() {
    if (this.user.phone == null || this.user.phone === '') {
      this.alertPhoneMessage += '● phone is empty<br>';
    }
    if (!(this.user.phone.match('[+][0-9]') || this.user.phone.match('[0-9]')) || this.user.phone.length < 7 ) {
      this.alertPhoneMessage += '● phone format is wrong<br>';
    }
  }

  PrivacyCheck() {
    if (this.alertPrivacyMessage == null || this.alertPrivacyMessage === '') {
      this.alertPrivacyMessage += '● privacy has not been agreed<br>';
    }
  }

  UsernameRuleShow() {
    this.showUsernameRule = true;
    this.showPasswordRule = false;
  }

  PasswordRuleShow() {
    this.showUsernameRule = false;
    this.showPasswordRule = true;
  }

  ruleClose() {
    this.showPasswordRule = false;
    this.showUsernameRule = false;
  }

  showPasswordOrNot() {
    const passwordInput = document.getElementById('password');
    const repeatPasswordInput = document.getElementById('repeatPassword');
    const passwordEye = document.getElementById('passwordEye');

    if (passwordEye.getAttribute('color') === 'medium') {
      passwordInput.setAttribute('type', 'text');
      repeatPasswordInput.setAttribute('type', 'text');
      passwordEye.setAttribute('color', 'primary');
    } else {
      passwordInput.setAttribute('type', 'password');
      repeatPasswordInput.setAttribute('type', 'password');
      passwordEye.setAttribute('color', 'medium');
    }
  }

  toPrivacy() {
    this.router.navigate(['tabs/me/user-privacy']);
  }
}

