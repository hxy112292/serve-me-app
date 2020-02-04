import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';

@Component({
  selector: 'app-search-vendor',
  templateUrl: './search-vendor.page.html',
  styleUrls: ['./search-vendor.page.scss'],
})
export class SearchVendorPage implements OnInit {
  private serviceList: Service[];
  private city: string;
  private service: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private constant: ConstantsService) { }

  ngOnInit() {
    this.getVendorInfo();
  }

  getVendorInfo() {
    this.city = this.route.snapshot.paramMap.get('city');
    this.service = this.route.snapshot.paramMap.get('service');
    console.log(this.city, this.service);

    this.http.get(this.constant.baseUrl + '/service/searchVendor', {
      params: {
        city: this.city,
        type: this.service
      }
    }).subscribe(res => {
      console.log(res);
      this.serviceList = (res as any).result;
      console.log(this.serviceList);
    });
  }

}
