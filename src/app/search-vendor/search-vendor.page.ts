import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-search-vendor',
  templateUrl: './search-vendor.page.html',
  styleUrls: ['./search-vendor.page.scss'],
})
export class SearchVendorPage implements OnInit {
  serviceList: Service[];
  star: string;
  city: string;
  service: string;
  vendorStars: string;
  starFilter: number;
  vendorName: string;
  sortOption: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) {

    this.starFilter = 3;
  }

  ngOnInit() {
    this.getVendorList();
  }

  getVendorList() {
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
      this.serviceList = (res as any).result;
    });
  }

  toServiceDetail(service: Service) {
    this.router.navigate(['/tabs/home/service-detail', {serviceInfo: JSON.stringify(service)}]);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.starFilter = 3;
    this.sortOption = '';
    this.getVendorList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  quickSort(arr) {

    if (arr.length <= 1) { return arr; }

    const pivotIndex = Math.floor(arr.length / 2);
    const left = [];
    const right = [];
    const pivot = arr.splice(pivotIndex, 1)[0];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      if (this.sortOption === 'priceLow') {
        if (arr[i].price < pivot.price) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      } else if (this.sortOption === 'priceHigh') {
        if (arr[i].price > pivot.price) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      } else if (this.sortOption === 'popularLow') {
        if (arr[i].orderTotal < pivot.orderTotal) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      } else if (this.sortOption === 'popularHigh') {
        if (arr[i].orderTotal > pivot.orderTotal) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      } else {
        if (arr[i].id < pivot.id) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
    }
    return this.quickSort(left).concat([pivot], this.quickSort(right));
  }

  sortServiceList(originServiceList: Service[]) {
    this.serviceList = this.quickSort(originServiceList);
  }
}
