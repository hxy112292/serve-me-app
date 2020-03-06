import { Component, OnInit } from '@angular/core';
import {Order} from '../entity/order';
import {Review} from '../entity/review';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Bid} from '../entity/bid';

@Component({
  selector: 'app-vendor-bid-detail',
  templateUrl: './vendor-bid-detail.page.html',
  styleUrls: ['./vendor-bid-detail.page.scss'],
})
export class VendorBidDetailPage implements OnInit {

  order: Order;
  bid: Bid;
  bidList: Bid[];
  isBid: boolean;

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

    this.bid = {
      id: '',
      vendorId: '',
      serviceId: '',
      orderId: '',
      price: ''
    };

    this.isBid = false;
  }

  ngOnInit() {
    this.order = JSON.parse(this.route.snapshot.paramMap.get('bidInfo'));
    this.getBid();
  }

  async getBid() {
    await this.http.get(this.constant.baseUrl + '/bid/searchBid', {
      params: {
        vendorId: this.constant.getUser().id,
        orderId: this.order.id
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        this.bidList = null;
        return;
      }
      this.bidList = (res as any).result;
      if (this.bidList.length !== 0) {
        this.bid = this.bidList[0];
        this.isBid = true;
      }
      console.log(this.bidList);
    });
  }

  provideBid() {
    if (this.bid.price == null || this.bid.price === '') {
      this.constant.alert('the bid is empty!');
      return;
    }
    this.bid.orderId = this.order.id;
    this.bid.serviceId = this.order.serviceId;
    this.bid.vendorId = this.constant.getUser().id;
    this.http.post(this.constant.baseUrl + '/bid/insertBid', this.bid).subscribe( res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        return;
      }
      this.getBid();
      this.constant.alert('Provide bid successful');
    });

  }

  updateBid() {
    if (this.bid.price == null || this.bid.price === '') {
      this.constant.alert('the bid is empty!');
      return;
    }
    this.bid.orderId = this.order.id;
    this.bid.serviceId = this.order.serviceId;
    this.bid.vendorId = this.constant.getUser().id;
    this.http.put(this.constant.baseUrl + '/bid/updateBid', this.bid).subscribe( res => {
      if ((res as any).code !== 0) {
        this.constant.alert((res as any).message);
        return;
      }
      this.getBid();
      this.constant.alert('Update bid successful');
    });
  }
}
