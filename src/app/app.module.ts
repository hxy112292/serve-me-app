import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ConstantsService} from './constants.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StarRatingModule } from 'ionic4-star-rating';

import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    // Vibration,
    SplashScreen,
    Vibration,
    FCM,
    LocalNotifications,
    AppUpdate,
    AppVersion,
    // LocalNotifications,
    StarRatingModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ConstantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
