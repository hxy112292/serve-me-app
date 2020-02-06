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
  user: User;
  dateStart: any;
  dateEnd: any;
  diffInDays: any;
  cost: number;
  address: any;
  order: Order;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) { }

  ngOnInit() {

    this.vendor = JSON.parse(this.route.snapshot.paramMap.get('vendorInfo'));

    this.getUser();
  }

  getUser() {
    this.http.get(this.constant.baseUrl + '/user/info', {
      params: {
        userId: this.constant.uid
      }
    }).subscribe(res => {
      this.user = (res as any).result;
      console.log(this.user.username);
    });
  }

  getCost() {
    if (this.dateStart == null || this.dateStart === '') {
      return;
    }
    if (this.dateEnd == null || this.dateEnd === '') {
      return;
    }
    this.cost = Math.floor((new Date(this.dateEnd).getTime() - new Date(this.dateStart).getTime()) / 1000 / 60 / 60 / 24
        * Number(this.vendor.service.price));
  }

  checkOut() {
    this.http.post(this.constant.baseUrl + '/order/insert', {
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      address: this.address,
      serviceType: this.vendor.service.type,
      customerId: this.user.id,
      price: this.vendor.service.price,
      vendorId: this.vendor.service.vendorId,
      serviceId: this.vendor.service.id
    }).subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['/tabs/order']);
  }

}
