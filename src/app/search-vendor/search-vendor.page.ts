import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Vendor} from '../entity/vendor';

@Component({
  selector: 'app-search-vendor',
  templateUrl: './search-vendor.page.html',
  styleUrls: ['./search-vendor.page.scss'],
})
export class SearchVendorPage implements OnInit {
  vendorList: Vendor[];
  city: string;
  service: string;

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
      this.vendorList = (res as any).result;
    });
  }

  toServiceDetail(vendor: Vendor) {
    this.router.navigate(['/tabs/home/service-detail', {vendorInfo: JSON.stringify(vendor)}]);
  }
}
