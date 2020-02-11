import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Vendor} from '../entity/vendor';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-search-vendor',
  templateUrl: './search-vendor.page.html',
  styleUrls: ['./search-vendor.page.scss'],
})
export class SearchVendorPage implements OnInit {
  vendorList: Vendor[];
  star: string;
  city: string;
  service: string;
  vendorStars: string;
  starFilter: number;
  vendorName: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) { }

  ngOnInit() {
    this.getVendorInfo();
  }

  getVendorInfo() {
    this.city = this.route.snapshot.paramMap.get('city');
    this.service = this.route.snapshot.paramMap.get('service');

    this.http.get(this.constant.baseUrl + '/service/searchVendor', {
      params: {
        city: this.city,
        type: this.service
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.vendorList = (res as any).result;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.vendorList.length; i++) {
        for (let j = 0; j < Number(this.vendorList[i].star); j++) {
          if (j === 0 ) {
            this.star = '★';
          } else {
            this.star += '★';
          }
        }
        for (let k = 0; k < 5 - Number(this.vendorList[i].star); k++) {
          this.star += '☆';
        }
        this.vendorList[i].starStr = this.star;
      }
    });
  }

  toServiceDetail(vendor: Vendor) {
    this.router.navigate(['/tabs/home/service-detail', {vendorInfo: JSON.stringify(vendor)}]);
  }
}
