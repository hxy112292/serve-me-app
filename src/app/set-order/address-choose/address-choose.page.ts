import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../constants.service';
import {ModalController} from '@ionic/angular';
import {Address} from '../../entity/address';

@Component({
  selector: 'app-address-choose',
  templateUrl: './address-choose.page.html',
  styleUrls: ['./address-choose.page.scss'],
})
export class AddressChoosePage implements OnInit {

  addressAdd: Address;
  addressChoose: Address;
  addressList: Address[];
  addPageShow: boolean;
  chooseButtonShow: boolean;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService,
              public modalController: ModalController) {

    this.addressAdd = {
      id: '',
      userId: '',
      customerName: '',
      phone: '',
      address: '',
      zipCode: '',
      createTime: '',
      updateTime: ''
    };

    this.addressChoose = {
      id: '',
      userId: '',
      customerName: '',
      phone: '',
      address: '',
      zipCode: '',
      createTime: '',
      updateTime: ''
    };

    this.addPageShow = false;
    this.chooseButtonShow = false;
  }

  ngOnInit() {
    this.getAddressByCustomer();
  }

  getAddressByCustomer() {
    if (this.constant.getUser() == null || this.constant.getUser().id == null || this.constant.getUser().id === '') {
      return;
    }
    this.http.get(this.constant.baseUrl + '/address/findByCustomer', {
      params: {
        userId: this.constant.getUser().id
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        this.addressList = null;
        return;
      }
      this.addressList = (res as any).result;
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getAddressByCustomer();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  dismiss(addressInfo: Address) {
    this.modalController.dismiss(addressInfo).then(() => {

    });
  }

  addButtonShow() {
    if (this.addPageShow === false) {
      this.addPageShow = true;
    } else {
      this.addPageShow = false;
    }
  }

  addAddress() {
    if (this.addressAdd.customerName == null || this.addressAdd.customerName === '') {
      this.constant.alert('the name is null');
      return;
    }
    if (this.addressAdd.phone == null || this.addressAdd.phone === '') {
      this.constant.alert('the phone is null');
      return;
    }
    if (!(this.addressAdd.phone.match('[+][0-9]') || this.addressAdd.phone.match('[0-9]')) || this.addressAdd.phone.length < 7 ) {
      this.constant.alert('the phone format is wrong');
      return;
    }
    if (this.addressAdd.address == null || this.addressAdd.address === '') {
      this.constant.alert('the address is null');
      return;
    }
    if (this.addressAdd.zipCode == null || this.addressAdd.zipCode === '') {
      this.constant.alert('the zipCode is null');
      return;
    }
    if (this.constant.getUser() == null || this.constant.getUser().id == null || this.constant.getUser().id === '') {
      this.http.post(this.constant.baseUrl + '/user/signup', {
        role: 'GUEST'
      }).subscribe(res => {
        if ((res as any).code !== 0) {
          alert((res as any).message);
          return;
        }
        this.constant.setUser((res as any).result);
        localStorage.setItem('uid', this.constant.getUser().id);
        this.addressAdd.userId = this.constant.getUser().id;
        this.http.post(this.constant.baseUrl + '/address/insertAddress', this.addressAdd).subscribe(r => {
          if ((r as any).code !== 0) {
            alert((r as any).message);
            return;
          }
        });
      });
    } else {
      this.addressAdd.userId = this.constant.getUser().id;
      this.http.post(this.constant.baseUrl + '/address/insertAddress', this.addressAdd).subscribe(res => {
        if ((res as any).code !== 0) {
          alert((res as any).message);
          return;
        }
      });
    }
    this.addButtonShow();
  }

  closeChooseButton() {
    this.chooseButtonShow = false;
  }

  openChooseButton() {
    this.chooseButtonShow = true;
  }
}
