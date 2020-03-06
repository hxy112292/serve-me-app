import { Component, OnInit } from '@angular/core';
import {Order} from '../entity/order';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-vendor-bid',
  templateUrl: './vendor-bid.page.html',
  styleUrls: ['./vendor-bid.page.scss'],
})
export class VendorBidPage implements OnInit {

  orderList: Order[];
  searchValue: string;
  orderStatus: string;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController) {
    this.searchValue = '';
    this.orderStatus = '';
  }

  ngOnInit() {
    this.getOrderByVendor();
  }

  getOrderByVendor() {
    this.http.get(this.constant.baseUrl + '/order/findBidByVendor', {
      params: {
        vendorId: this.constant.getUser().id
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        this.orderList = null;
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

  toBidDetail(order: Order) {
    this.router.navigate(['tabs/me/vendor-center/vendor-bid-detail', {bidInfo: JSON.stringify(order)}]);
  }

}
