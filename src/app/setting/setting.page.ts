import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Router } from '@angular/router';
import {Setting} from '../entity/setting';
import {ConstantsService} from '../constants.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  setting: Setting;

  constructor(
      private router: Router,
      private vibration: Vibration,
      private constant: ConstantsService,
      private http: HttpClient
      ) {
    this.setting = this.constant.getSetting();
  }

  ngOnInit() {
  }
  sounds() {
    this.vibration.vibrate(1000);
  }

  settingChange() {
    this.http.put(this.constant.baseUrl + '/setting/update', this.setting).subscribe( res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        return;
      }
    });

  }
}
