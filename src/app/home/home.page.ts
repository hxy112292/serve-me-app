import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
              private route: ActivatedRoute) { }

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
  setting() {

    this.router.navigate(['/tabs/me/setting']);
    // this.router.navigate(['/tabs/home/order']);
  }
}
