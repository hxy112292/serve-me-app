import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {User} from '../entity/user';
import {Order} from '../entity/order';
import {Service} from '../entity/service';

@Component({
  selector: 'app-set-order',
  templateUrl: './set-order.page.html',
  styleUrls: ['./set-order.page.scss'],
})
export class SetOrderPage implements OnInit {

  service: Service;
  order: Order;
  cost: number;
  user: User;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) {
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

    this.user = {
      id: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: 'GUEST'
    };
  }

  ngOnInit() {
    this.getVendor();
  }
  getVendor() {
    this.service = JSON.parse(this.route.snapshot.paramMap.get('serviceInfo'));
    this.order.vendorId = this.service.vendorId;
    this.order.price = this.service.price;
    this.order.serviceId = this.service.id;
    this.order.serviceType = this.service.type;
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
      if (this.user.phone == null || this.user.phone === '') {
        alert('you need to choose an phone');
        return;
      }
      if (this.user.username == null || this.user.username === '') {
        alert('you need to choose an username');
        return;
      }
      this.http.post(this.constant.baseUrl + '/user/signup', {
        username: this.user.username,
        phone: this.user.phone,
        role: 'GUEST'
      }).subscribe(res => {
        if ((res as any).code !== 0) {
          alert((res as any).message);
          return;
        }
        this.constant.setUser((res as any).result);
        localStorage.setItem('uid', this.constant.getUser().id);
        this.order.customerId = this.constant.getUser().id;
        this.http.post(this.constant.baseUrl + '/order/insert', this.order).subscribe(r => {
          if ((r as any).code !== 0) {
            alert((r as any).message);
            return;
          }
        });
      });
    } else {
      this.order.customerId = this.constant.getUser().id;
      this.http.post(this.constant.baseUrl + '/order/insert', this.order).subscribe(res => {
        if ((res as any).code !== 0) {
          alert((res as any).message);
          return;
        }
      });
    }

    this.router.navigate(['/tabs/order']);
  }

  singup() {
    this.router.navigate(['/tabs/me/login']);
  }
}
