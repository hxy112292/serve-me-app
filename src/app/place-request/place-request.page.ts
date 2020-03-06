import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {Order} from '../entity/order';
import {User} from '../entity/user';
import {Address} from '../entity/address';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ModalController} from '@ionic/angular';
import {AddressChoosePage} from './address-choose/address-choose.page';

@Component({
  selector: 'app-place-request',
  templateUrl: './place-request.page.html',
  styleUrls: ['./place-request.page.scss'],
})
export class PlaceRequestPage implements OnInit {

  service: Service;
  order: Order;
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
      star: 0,
      city: '',
      description: ''
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
    this.order.serviceType = this.route.snapshot.paramMap.get('service');
    this.order.city = this.route.snapshot.paramMap.get('city');
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

  placeRequest() {
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
    this.order.status = 'BIDING';
    this.http.post(this.constant.baseUrl + '/order/insert', this.order).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
    });

    this.router.navigate(['/tabs/order']);
  }
}
