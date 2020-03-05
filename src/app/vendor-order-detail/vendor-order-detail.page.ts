import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../entity/order';
import {Review} from '../entity/review';

@Component({
  selector: 'app-vendor-order-detail',
  templateUrl: './vendor-order-detail.page.html',
  styleUrls: ['./vendor-order-detail.page.scss'],
})
export class VendorOrderDetailPage implements OnInit {

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
      star: 0
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
        alert((res as any).message);
        this.review = null;
        return;
      }
      this.review = (res as any).result;
    });
  }
}
