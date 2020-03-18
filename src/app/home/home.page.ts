import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConstantsService} from '../constants.service';
import {AppUpdate} from '@ionic-native/app-update/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: any;
  service: any;
  slideOpts: any;
  showHelpSelectVendor: boolean;
  showHelpPlaceRequest: boolean;
  appVersionNumber: string;

  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private constant: ConstantsService,
              private router: Router,
              private appUpdate: AppUpdate,
              private appVersion: AppVersion) {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true
    };

    this.showHelpSelectVendor = false;
    this.showHelpPlaceRequest = false;
  }

  ngOnInit() {

    this.checkVersion();
  }

  searchVendor() {
    if (this.city == null || this.city === '') {
      this.constant.alert('you need to choose a city');
      return;
    }
    if (this.service == null || this.service === '') {
      this.constant.alert('you need to choose a service');
      return;
    }
    // this.navCtrl.navigateForward('/tabs/home/search-vendor');
    this.router.navigate(['/tabs/home/search-vendor', {city: this.city, service: this.service}]);
  }

  toIntroduction() {
    this.router.navigate(['tabs/home/introduction']);
  }

  toJoinUs() {
    this.router.navigate(['tabs/home/join-us']);
  }

  toSignIn() {
    this.router.navigate(['tabs/me']);
  }

  placeRequest() {
    if (this.city == null || this.city === '') {
      this.constant.alert('you need to choose a city');
      return;
    }
    if (this.service == null || this.service === '') {
      this.constant.alert('you need to choose a service');
      return;
    }
    this.router.navigate(['tabs/home/place-request', {city: this.city, service: this.service}]);
  }

  helpSelectVendor() {
    if (this.showHelpSelectVendor === true) {
      this.showHelpSelectVendor = false;
    } else {
      this.showHelpSelectVendor = true;
    }
  }

  helpPlaceRequest() {
    if (this.showHelpPlaceRequest === true) {
      this.showHelpPlaceRequest = false;
    } else {
      this.showHelpPlaceRequest = true;
    }
  }

  getVersion() {
    this.appVersion.getVersionNumber().then( res => {
      this.appVersionNumber = res;
    }).catch( err => {
      console.log(err);
    });
  }

  checkVersion() {
    this.getVersion();
    const updateUrl = this.constant.baseUrl + '/update/xml';
    this.appUpdate.checkAppUpdate(updateUrl).then(
        res => {
          console.log(res);
        }).catch(
        err => {
          console.log(err);
        }
    );
  }
}
