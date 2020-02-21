import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConstantsService} from "../constants.service";

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
              private constant: ConstantsService,
              private router: Router) {
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
}
