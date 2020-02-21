import { Injectable } from '@angular/core';
import {User} from './entity/user';
import {Setting} from './entity/setting';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  // readonly baseUrl: string = 'https://serve-me-hxy.herokuapp.com';
  // readonly baseUrl: string = 'https://35.193.61.114:6066';
  readonly baseUrl: string = 'https://www.hxyvip.club:6066';
  user: User;
  setting: Setting;

  constructor(public alertController: AlertController) {
    this.user = {
      id: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: ''
    };

    this.setting = {
      id: '',
      userId: '',
      notification: '',
      vibration: ''
    };
  }

  getSetting() {
    return this.setting;
  }

  setSetting(setting: Setting) {
    this.setting = setting;
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    if (user == null) {
      this.user = {
        id: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        role: ''
      };
    } else {
      this.user = user;
    }
  }

  async alert(text: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: subtitle,
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }


}
