import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {User} from '../entity/user';
import {Order} from '../entity/order';
import {Service} from '../entity/service';
import {Address} from '../entity/address';
import { ModalController } from '@ionic/angular';
import {AddressChoosePage} from './address-choose/address-choose.page';

@Component({
  selector: 'app-set-order',
  templateUrl: './set-order.page.html',
  styleUrls: ['./set-order.page.scss'],
})
export class SetOrderPage implements OnInit {

  service: Service;
  order: Order;
  costNoOFF: number;
  costOFF: number;
  user: User;
  address: Address;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService,
              public modalController: ModalController) {
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
      addressId: '',
      price: '',
      costOff: '',
      costNoOff: '',
      dateStart: '',
      dateEnd: '',
      status: '',
      createTime: '',
      updateTime: '',
      star: 0
    };

    this.user = {
      id: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: 'GUEST'
    };

    this.address = {
      id: '',
      userId: '',
      customerName: '',
      phone: '',
      address: '',
      zipCode: '',
      createTime: '',
      updateTime: ''
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
    this.costNoOFF = ((new Date(this.order.dateEnd).getTime() - new Date(this.order.dateStart).getTime()) / 1000 / 60 / 60 / 24 + 1)
        * Number(this.service.price);
    this.costOFF = this.costNoOFF * 0.8;
    this.order.costNoOff = this.costNoOFF.toFixed(2);
    this.order.costOff = this.costOFF.toFixed(2);
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
    if (new Date(this.order.dateEnd) < new Date(this.order.dateStart)) {
      alert('your start date is later than the end date');
      return;
    }
    if (this.address.address == null || this.address.address === '') {
      alert('you need to choose an address');
      return;
    }
    this.order.customerId = this.constant.getUser().id;
    this.order.addressId = this.address.id;
    if (this.constant.getUser().role === 'GUEST') {
      this.order.costOff = null;
    } else {
      this.order.costNoOff = null;
    }
    this.http.post(this.constant.baseUrl + '/order/insert', this.order).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
    });

    this.router.navigate(['/tabs/order']);
  }

  singup() {
    this.router.navigate(['/tabs/me/login']);
  }

  async toAddressChoose() {
    const modal = await this.modalController.create({
      component: AddressChoosePage
    });
    await modal.present();
    const data = ((await modal.onDidDismiss()) as any).data;
    if (data != null) {
      this.address = data;
    }
  }
}
