import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: any;
  service: any;

  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private router: Router,
              private route: ActivatedRoute,
              private fcm: FCM,
              public plt: Platform) {
    this.plt.ready()
        .then(() => {
          this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
              console.log('Received in background');
            } else {
              console.log('Received in foreground');
            }
          });

          this.fcm.onTokenRefresh().subscribe(token => {
            // Register your new token in your back-end if you want
            // backend.registerToken(token);
          });
        });
  }

  ngOnInit() {
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
}
