import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Vendor} from '../entity/vendor';
import {Order} from '../entity/order';
import {Service} from '../entity/service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.page.html',
  styleUrls: ['./order-update.page.scss'],
})
export class OrderUpdatePage implements OnInit {

  vendor: Vendor;
  vendorList: Vendor[];
  star: string;
  order: Order;
  cost: number;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) {
    this.vendor = {
      service: {
        id: '',
        type: '',
        vendorId: '',
        city: '',
        price: '',
      },
      id: '',
      username: '',
      star: 0,
      starStr: '',
      phone: '',
      email: '',
    };
    this.order = {
      id: '',
      customerId: this.constant.getUser().id,
      customerName: this.constant.getUser().username,
      customerPhone: this.constant.getUser().phone,
      vendorId: '',
      vendorName:  '',
      vendorPhone: '',
      serviceId: '',
      serviceType: '',
      address: '',
      price: '',
      dateStart: '',
      dateEnd: '',
      status: '',
    };
  }

  ngOnInit() {
    this.order = JSON.parse(this.route.snapshot.paramMap.get('orderInfo'));
    this.getVendorInfo();
  }

  getVendorInfo() {
    this.http.get(this.constant.baseUrl + '/service/searchVendor', {
      params: {
        type: this.order.serviceType,
        vendorId: this.order.vendorId
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
      this.vendor = this.vendorList[0];
      this.getCost();
    });
  }

  getCost() {
    if (this.order.dateStart == null || this.order.dateStart === '') {
      return;
    }
    if (this.order.dateEnd == null || this.order.dateEnd === '') {
      return;
    }
    this.cost = Math.floor(((new Date(this.order.dateEnd).getTime() - new Date(this.order.dateStart).getTime()) / 1000 / 60 / 60 / 24 + 1)
        * Number(this.vendor.service.price));
  }

  updateOrder() {
    this.http.put( this.constant.baseUrl + '/order/update', this.order).subscribe( res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
    });
    this.router.navigate(['/tabs/order']);
  }
}
