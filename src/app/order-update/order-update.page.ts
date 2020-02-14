import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Order} from '../entity/order';
import {Service} from '../entity/service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.page.html',
  styleUrls: ['./order-update.page.scss'],
})
export class OrderUpdatePage implements OnInit {

  service: Service;
  serviceList: Service[];
  star: string;
  order: Order;
  costNoOFF: number;
  costOFF: number;

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
      costOff: '',
      costNoOff: '',
      dateStart: '',
      dateEnd: '',
      status: '',
      createTime: '',
      updateTime: ''
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
    this.costNoOFF = ((new Date(this.order.dateEnd).getTime() - new Date(this.order.dateStart).getTime()) / 1000 / 60 / 60 / 24 + 1)
        * Number(this.service.price);
    this.costOFF = this.costNoOFF * 0.8;
    this.order.costNoOff = this.costNoOFF.toFixed(2);
    this.order.costOff = this.costOFF.toFixed(2);
  }

  updateOrder() {
    if (this.order.dateStart == null || this.order.dateStart === '') {
      alert('you need to choose a date start');
      return;
    }
    if (this.order.dateEnd == null || this.order.dateEnd === '') {
      alert('you need to choose a date end');
      return;
    }
    if (this.order.address == null || this.order.address === '') {
      alert('you need to choose an address');
      return;
    }
    this.http.put( this.constant.baseUrl + '/order/update', this.order).subscribe( res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
    });
    this.router.navigate(['/tabs/order']);
  }
}
