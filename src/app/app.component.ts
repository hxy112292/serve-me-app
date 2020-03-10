import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from './constants.service';
import {FCM} from '@ionic-native/fcm/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  uid: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private http: HttpClient,
    private constant: ConstantsService,
    private fcm: FCM,
    private vibration: Vibration,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      window.setTimeout( function() {
        this.splashscreen.hide();
      }, 3000)
      // this.splashScreen.hide();
      this.initFCM();
      this.getUserInfo();
    });
  }

  getUserInfo() {
    this.uid = localStorage.getItem('uid');
    if (this.uid != null) {
      this.http.get(this.constant.baseUrl + '/user/info', {
        params: {
          userId: this.uid
        }
      }).subscribe(res => {
        this.constant.setUser((res as any).result);
        this.getToken();
        this.initSetting();
      });
    }
  }

  initFCM() {
    this.fcm.onNotification().subscribe(data => {
      if (this.constant.getSetting().vibration == null || this.constant.getSetting().vibration === ''
          || this.constant.getSetting().vibration === 'true') {
        this.vibration.vibrate(2000);
      }
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
        console.log(data);
        this.localNotifications.schedule({
          id: 1,
          title: data.title,
          text: data.body,
          icon: 'res://ic_launcher.png'
        });
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
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
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  initSetting() {
    this.http.post(this.constant.baseUrl + '/setting/init', {
      userId: this.constant.getUser().id
    }).subscribe( res => {
      this.constant.setSetting((res as any).result);
      if (this.constant.getUser() != null && this.constant.getUser().id != null && this.constant.getUser().id !== '') {
        if ( this.constant.getSetting().notification == null || this.constant.getSetting().notification === ''
            || this.constant.getSetting().notification === 'true') {
          if (this.constant.getSetting().vibration == null || this.constant.getSetting().vibration === ''
              || this.constant.getSetting().vibration === 'true') {
            this.vibration.vibrate(1500);
          }
          this.localNotifications.schedule({
            id: 2,
            title: 'Welcome',
            text: 'Hi, ' + this.constant.getUser().username + '. Have a good day',
            icon: 'res://ic_launcher.png'
          });
        }
      }
    });
  }
}
