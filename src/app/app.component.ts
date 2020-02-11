import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from './constants.service';
import {FCM} from '@ionic-native/fcm/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

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
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      this.getUserInfo();
      this.initFCM();
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
      });
    }
  }

  initFCM() {
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
        console.log(data);
        this.localNotifications.schedule({
          id: 1,
          title: data.title,
          text: data.body
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
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
}
