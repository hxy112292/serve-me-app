import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
      private router: Router,
      private vibration: Vibration,
      ) { }

  ngOnInit() {
  }
  sounds() {

    // this.notice();
    // this.vibration.vibrate(1000);
    this.vibration.vibrate(1000);
    // this.router.navigate(['/tabs/me/setting']);
    // this.router.navigate(['/tabs/home/order']);
  }
  // notification() {
  //   this.localNotifications.schedule({
  //     id: 1,
  //     text: 'Single ILocalNotification',
  //     // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
  //     data: { secret: key }
  //   });
  // }
}
