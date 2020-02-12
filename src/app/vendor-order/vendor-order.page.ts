import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Order} from '../entity/order';

@Component({
  selector: 'app-vendor-order',
  templateUrl: './vendor-order.page.html',
  styleUrls: ['./vendor-order.page.scss'],
})
export class VendorOrderPage implements OnInit {

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  orderList: Order[];


  ngOnInit() {
  }

  getOrderByVendor() {
    this.http.get(this.constant.baseUrl + '/order/findOrderByVendor', {
      params: {
        vendorId: this.constant.getUser().id
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.orderList = (res as any).result;
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getOrderByVendor();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
