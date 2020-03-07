import { Component, OnInit } from '@angular/core';
import {Order} from '../entity/order';
import {Review} from '../entity/review';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customer-order-detail',
  templateUrl: './customer-order-detail.page.html',
  styleUrls: ['./customer-order-detail.page.scss'],
})
export class CustomerOrderDetailPage implements OnInit {

  order: Order;
  review: Review;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute, ) {

    this.order = {
      id: '',
      customerId: '',
      customerName: '',
      customerPhone: '',
      vendorId: '',
      vendorName:  '',
      vendorPhone: '',
      serviceId: '',
      serviceType: '',
      address: '',
      addressId: '',
      price: '',
      costOff: '',
      costNoOff: '',
      dateStart: '',
      dateEnd: '',
      status: '',
      createTime: '',
      updateTime: '',
      star: 0,
      city: '',
      description: ''
    };

    this.review = {
      id: '',
      orderId: '',
      vendorId: '',
      customerId: '',
      customerName: '',
      serviceId: '',
      star: 0,
      content: '',
      createTime: '',
      updateTime: ''
    };
  }

  ngOnInit() {

    this.order = JSON.parse(this.route.snapshot.paramMap.get('orderInfo'));
    this.getReview();
  }

  getReview() {
    this.http.get(this.constant.baseUrl + '/review/findReviewsByOrderId', {
      params: {
        orderId: this.order.id
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        this.review = null;
        return;
      }
      this.review = (res as any).result;
    });
  }
}
