import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConstantsService} from '../constants.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  constructor(private router: Router,
              public constant: ConstantsService,
              private vibration: Vibration) { }

  ngOnInit() {
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
}
