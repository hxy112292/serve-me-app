import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../entity/order';
import {ConstantsService} from '../constants.service';

// import { LocalNotifications } from '@ionic-native/local-notifications';


// import { Vibration } from '@ionic-native/vibration';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute) { }

  orderList: Order[];
i;
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
}
