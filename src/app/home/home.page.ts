import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {ConstantsService} from '../constants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: any;
  service: any;
  uid: any;

  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private router: Router,
              private route: ActivatedRoute,
              private fcm: FCM,
              public plt: Platform,
              private localNotifications: LocalNotifications,
              private constant: ConstantsService) {
    this.plt.ready()
        .then(() => {
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
        });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  searchVendor() {
    if (this.city == null || this.city === '') {
      alert('you need to choose a city');
      return;
    }
    if (this.service == null || this.service === '') {
      alert('you need to choose a service');
      return;
    }
    // this.navCtrl.navigateForward('/tabs/home/search-vendor');
    this.router.navigate(['/tabs/home/search-vendor', {city: this.city, service: this.service}]);
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

  getUserInfo() {
    this.uid = localStorage.getItem('uid');
    if (this.uid != null) {
      this.http.get(this.constant.baseUrl + '/user/info', {
        params: {
          userId: this.uid
        }
      }).subscribe(res => {
        this.constant.setUser((res as any).result);
        console.log(this.constant.getUser());
      });
    }
  }
}
