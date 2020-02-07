import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConstantsService} from '../constants.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit{

  username: string;

  constructor(private router: Router,
              private constant: ConstantsService,
              private vibration: Vibration) { }

  ngOnInit() {

    this.username = this.constant.username;
    console.log(this.username);
  }
  login() {
    this.router.navigate(['tabs/home']);
  }

  myorder() {
    this.router.navigate(['tabs/order']);
  }

  personalInfo() {
    this.router.navigate(['tabs/home']);
  }

  setting() {

    // this.notice();
    // this.vibration.vibrate(1000);
    this.vibration.vibrate(1000);
    // this.router.navigate(['/tabs/me/setting']);

    // this.router.navigate(['/tabs/home/order']);
  }

  logout() {
    this.username = null;
  }
}
