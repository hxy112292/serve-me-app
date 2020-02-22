import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../entity/service';

@Component({
  selector: 'app-vendor-center',
  templateUrl: './vendor-center.page.html',
  styleUrls: ['./vendor-center.page.scss'],
})
export class VendorCenterPage implements OnInit {
  vendorPage: string;
  serviceList: Service[];
  isNewVendor: boolean;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.vendorPage = 'vendorOrder';
  }

  ngOnInit() {
    this.checkNewVendor();
  }

  checkNewVendor() {
    this.http.get(this.constant.baseUrl + '/service/findServiceByVendorId', {
      params: {
        vendorId: this.constant.getUser().id
      }
    }).subscribe(res => {
          if ((res as any).code !== 0) {
            alert((res as any).message);
            return;
          }
          this.serviceList = (res as any).result;
          if (this.serviceList.length === 0) {
            this.isNewVendor = true;
          } else {
            this.isNewVendor = false;
          }
          console.log(this.isNewVendor);
        }
    );
  }

  changeVendorPage(page: string) {
    this.vendorPage = page;
  }
}
