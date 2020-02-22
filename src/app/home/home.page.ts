import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConstantsService} from '../constants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  city: any;
  service: any;
  slideOpts: any;

  constructor(private http: HttpClient,
              private navCtrl: NavController,
              private constant: ConstantsService,
              private router: Router) {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true
    };
  }

  ngOnInit() {
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

}
