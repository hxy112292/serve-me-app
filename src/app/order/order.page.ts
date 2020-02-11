import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../entity/order';
import {ConstantsService} from '../constants.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  orderList: Order[];

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList() {
    this.http.get(this.constant.baseUrl + '/order/findOrderByCustomer', {
      params: {
        customerId: this.constant.getUser().id
      }
    }).subscribe(res => {
      this.orderList = (res as any).result;
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getOrderList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  updateOrder(order) {
    this.router.navigate(['/tabs/order/order-update', {orderInfo: JSON.stringify(order)}]);
  }

  async cancelOrder(orderId) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Do you want to cancel an order? If you cancel an order, you will lose 10 points</strong>!',
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
            this.http.delete(this.constant.baseUrl + '/order/delete', {
              params: {
                id: orderId
              }
            }).subscribe( res => {this.getOrderList(); });
          }
        }
      ]
    });

    await alert.present();
  }
}
