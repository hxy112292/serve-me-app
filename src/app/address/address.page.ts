import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from '../entity/address';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  addressList: Address[];

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {

    this.getAddressByCustomer();
  }

  getAddressByCustomer() {
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

  addAddress() {
    this.router.navigate(['tabs/me/address-add']);
  }

  updateAddress(addressInfo: Address) {
    this.router.navigate(['tabs/me/address-update', {addressInfo: JSON.stringify(addressInfo)}]);
  }

  async deleteAddress(addressId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Do you want to delete this address?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.http.delete(this.constant.baseUrl + '/address/deleteAddress', {
              params: {
                id: addressId
              }
            }).subscribe(res => {this.getAddressByCustomer(); });
          }
        }
      ]
    });
    await alert.present();
  }
}
