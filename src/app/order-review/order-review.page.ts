import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Order} from '../entity/order';
import {Review} from '../entity/review';
import { StarRatingModule } from 'ionic4-star-rating';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.page.html',
  styleUrls: ['./order-review.page.scss'],
})
export class OrderReviewPage implements OnInit {

  order: Order;
  review: Review;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) {
    this.order = {
      id: '',
      customerId: this.constant.getUser().id,
      customerName: this.constant.getUser().username,
      customerPhone: this.constant.getUser().phone,
      vendorId: '',
      vendorName:  '',
      vendorPhone: '',
      serviceId: '',
      serviceType: '',
      address: '',
      price: '',
      costOff: '',
      costNoOff: '',
      dateStart: '',
      dateEnd: '',
      status: '',
      createTime: '',
      updateTime: ''
    };
    this.review = {
      id: '',
      orderId: '',
      vendorId: '',
      customerId: '',
      serviceId: '',
      star: 5,
      starStr: '',
      content: '',
      createTime: '',
      updateTime: ''
    };
  }

  ngOnInit() {
    this.order = JSON.parse(this.route.snapshot.paramMap.get('orderInfo'));
  }

  insertReview() {
    this.review.customerId = this.order.customerId;
    this.review.orderId = this.order.id;
    this.review.serviceId = this.order.serviceId;
    this.review.vendorId = this.order.vendorId;
    this.http.post(this.constant.baseUrl + '/review/insert', this.review).subscribe( res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
    } );
    this.router.navigate(['tabs/order']);

  }
}
