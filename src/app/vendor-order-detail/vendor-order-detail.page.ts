import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {Order} from '../entity/order';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';

@Component({
  selector: 'app-vendor-order-detail',
  templateUrl: './vendor-order-detail.page.html',
  styleUrls: ['./vendor-order-detail.page.scss'],
})
export class VendorOrderDetailPage implements OnInit {

  service: Service;
  serviceList: Service[];
  star: string;
  orderId: string;
  order: Order;
  cost: number;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) {
    this.service = {
      id: '',
      type: '',
      vendorId: '',
      city: '',
      price: '',
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
      createTime: '',
      updateTime: ''
    };
  }

  ngOnInit() {
    this.orderId = JSON.parse(this.route.snapshot.paramMap.get('orderId'));
    this.getOrderInfo();
  }

  getOrderInfo() {
    this.http.get(this.constant.baseUrl + '/order/findOrderById', {
      params: {
        id: this.orderId
      }
    }).subscribe( res => {
      this.order = (res as any).result;
      this.getVendorInfo();
    });
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
      this.serviceList = (res as any).result;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.serviceList.length; i++) {
        for (let j = 0; j < Number(this.serviceList[i].star); j++) {
          if (j === 0 ) {
            this.star = '★';
          } else {
            this.star += '★';
          }
        }
        for (let k = 0; k < 5 - Number(this.serviceList[i].star); k++) {
          this.star += '☆';
        }
        this.serviceList[i].starStr = this.star;
      }
      this.service = this.serviceList[0];
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
        * Number(this.service.price));
  }
}
