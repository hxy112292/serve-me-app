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

  orderList: Order[];
  searchValue: string;
  orderDate: string;
  orderStatus: string;
  orderReviewStar: number;

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
    this.http.get(this.constant.baseUrl + '/order/findOrderByVendor', {
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
    this.searchValue = '';
    this.orderDate = '';
    this.orderStatus = '';
    this.orderReviewStar = 0;
    this.getOrderByVendor();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  acceptOrder(order: Order) {
    this.http.put( this.constant.baseUrl + '/order/update', {
      id: order.id,
      customerId: order.customerId,
      vendorId: order.vendorId,
      status: 'PROCESSING'
    }).subscribe( res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        return;
      }
      this.getOrderByVendor();
    });
  }

  async cancelOrder(order: Order) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Do you want to cancel an order?</strong>',
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
            this.http.put(this.constant.baseUrl + '/order/update', {
              id: order.id,
              customerId: order.customerId,
              vendorId: order.vendorId,
              status: 'CANCELED'
            }).subscribe( res => {this.getOrderByVendor(); });
          }
        }
      ]
    });
    await alert.present();
  }

  finishOrder(order: Order) {
    this.http.put( this.constant.baseUrl + '/order/update', {
      id: order.id,
      customerId: order.customerId,
      vendorId: order.vendorId,
      status: 'FINISHED'
    }).subscribe( res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        return;
      }
      this.getOrderByVendor();
    });
  }

  toVendorService() {
    this.router.navigate(['tabs/me/vendor-service']);
  }

  calOrderDate(orderTime) {
    if ((new Date().getTime() - new Date(orderTime).getTime()) <= Number(this.orderDate) * 24 * 60 * 60 * 1000) {
      return true;
    } else {
      return false;
    }
  }

  orderStatusChange() {
    if (this.orderStatus !== 'REVIEWED') {
      this.orderReviewStar = null;
    }
  }

  toOrderDetail(order: Order) {
    this.router.navigate(['tabs/me/vendor-center/vendor-order-detail', {orderInfo: JSON.stringify(order)}]);
  }
}
