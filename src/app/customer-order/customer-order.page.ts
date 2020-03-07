import { Component, OnInit } from '@angular/core';
import {Order} from '../entity/order';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.page.html',
  styleUrls: ['./customer-order.page.scss'],
})
export class CustomerOrderPage implements OnInit {

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
    this.getOrderByCustomer();
  }

  getOrderByCustomer() {
    this.http.get(this.constant.baseUrl + '/order/findOrderByCustomer', {
      params: {
        customerId: this.constant.getUser().id
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
    this.getOrderByCustomer();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  updateOrder(order: Order) {

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
            }).subscribe( res => {this.getOrderByCustomer(); });
          }
        }
      ]
    });
    await alert.present();
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
    if (order.status !== 'BIDDING') {
      this.router.navigate(['tabs/customer-center/customer-order-detail', {orderInfo: JSON.stringify(order)}]);
    } else {
      this.router.navigate(['tabs/home/search-vendor', {
        city: order.city,
        service: order.serviceType,
        orderId: order.id
      }]);
    }
  }

  reviewOrder(order: Order) {

  }
}
