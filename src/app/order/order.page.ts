import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../entity/order';
import {ConstantsService} from '../constants.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orderList: Order[]

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.getOrderList();
  }

  getOrderList() {
    this.http.get(this.constant.baseUrl + '/order/findOrderByCustomer', {
      params: {
        customerId: this.constant.uid
      }
    }).subscribe(res => {
      this.orderList = (res as any).result;
      console.log(this.orderList[0].address);
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
