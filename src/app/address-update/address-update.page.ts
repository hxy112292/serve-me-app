import { Component, OnInit } from '@angular/core';
import {Address} from '../entity/address';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.page.html',
  styleUrls: ['./address-update.page.scss'],
})
export class AddressUpdatePage implements OnInit {

  address: Address;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute) {

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
    this.address = JSON.parse(this.route.snapshot.paramMap.get('addressInfo'));
  }

  updateAddress() {
    if (this.address.customerName == null || this.address.customerName === '') {
      this.constant.alert('the name is null');
      return;
    }
    if (this.address.phone == null || this.address.phone === '') {
      this.constant.alert('the phone is null');
      return;
    }
    if (!(this.address.phone.match('[+][0-9]') || this.address.phone.match('[0-9]')) || this.address.phone.length < 7 ) {
      this.constant.alert('the phone format is wrong');
      return;
    }
    if (this.address.address == null || this.address.address === '') {
      this.constant.alert('the address is null');
      return;
    }
    if (this.address.zipCode == null || this.address.zipCode === '') {
      this.constant.alert('the zipCode is null');
      return;
    }
    this.address.userId = this.constant.getUser().id;
    this.http.put(this.constant.baseUrl + '/address/updateAddress', this.address).subscribe( res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        return;
      }
      this.router.navigate(['tabs/me/address']);
    });
  }
}
