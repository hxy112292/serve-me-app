import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Vendor} from '../entity/vendor';
import {User} from '../entity/user';
import {Order} from '../entity/order';

@Component({
  selector: 'app-set-order',
  templateUrl: './set-order.page.html',
  styleUrls: ['./set-order.page.scss'],
})
export class SetOrderPage implements OnInit {

  vendor: Vendor;
  order: Order;
  cost: number;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) {
    this.order = {
      id: '',
      customerId: this.constant.getUser().id,
      vendorId: '',
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
    this.getVendor();
  }
  getVendor() {
    this.vendor = JSON.parse(this.route.snapshot.paramMap.get('vendorInfo'));
    this.order.vendorId = this.vendor.id;
    this.order.price = this.vendor.service.price;
    this.order.serviceId = this.vendor.service.id;
    this.order.serviceType = this.vendor.service.type;
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

  checkOut() {
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
    if (this.constant.getUser() == null || this.constant.getUser().id == null || this.constant.getUser().id === '') {
      this.http.post(this.constant.baseUrl + '/user/signup', {
        role: 'GUEST'
      }).subscribe(res => {
        this.constant.setUser((res as any).result);
        localStorage.setItem('uid', this.constant.getUser().id);
        this.order.customerId = this.constant.getUser().id;
        this.http.post(this.constant.baseUrl + '/order/insert', this.order).subscribe(r => {});
      });
    } else {
      this.order.customerId = this.constant.getUser().id;
      this.http.post(this.constant.baseUrl + '/order/insert', this.order).subscribe(res => {});
    }

    this.router.navigate(['/tabs/order']);
  }

  singup() {
    this.router.navigate(['/tabs/me/signup']);
  }
}
