import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConstantsService} from '../constants.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  appVersionNumber: string;

  constructor(private router: Router,
              public constant: ConstantsService,
              private vibration: Vibration,
              private appUpdate: AppUpdate,
              private appVersion: AppVersion) {
  }

  ngOnInit() {
    this.getVersion();
  }

  getVersion() {
    this.appVersion.getVersionNumber().then( res => {
      this.appVersionNumber = res;
    }).catch( err => {
      this.constant.alert(err);
    });
  }

  login() {
    this.router.navigate(['tabs/me/login']);
  }

  myorder() {
    this.router.navigate(['tabs/order']);
  }

  personalInfo() {
    this.router.navigate(['tabs/me/personal-info']);
  }

  setting() {

    // this.notice();
    // this.vibration.vibrate(1000);
    // this.vibration.vibrate(1000);
    this.router.navigate(['/tabs/me/setting']);

    // this.router.navigate(['/tabs/home/order']);
  }

  logout() {
    this.constant.setUser(null);
    localStorage.removeItem('uid');
  }

  point() {
    if (this.constant.getUser() != null && this.constant.getUser().id != null && this.constant.getUser().id !== ''
        && this.constant.getUser().role !== 'GUEST') {
      this.router.navigate(['/tabs/me/point']);
    } else {
      this.constant.alert('Please log in');
    }
  }

  vendorOrder() {
    if (this.constant.getUser() != null && this.constant.getUser().id != null && this.constant.getUser().id !== ''
        && this.constant.getUser().role !== 'GUEST') {
      this.router.navigate(['/tabs/me/vendor-center']);
    } else {
      this.constant.alert('Please log in');
    }
  }

  checkVersion() {
    this.getVersion();
    const updateUrl = this.constant.baseUrl + '/update/xml';
    this.appUpdate.checkAppUpdate(updateUrl).then(
        res => {
          console.log(res);
          if (res.code === 202) {
            this.constant.alert('Congratulation! The version is latest!');
          }
        }).catch(
        err => {
          this.constant.alert(err);
        }
    );
  }
}
