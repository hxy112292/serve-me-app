import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Review} from '../entity/review';
import {Service} from '../entity/service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {

  service: Service;
  reviewList: Review[];
  star: string;
  reviewTime: string;
  reviewType: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) { }

  ngOnInit() {

    this.service = JSON.parse(this.route.snapshot.paramMap.get('serviceInfo'));

    this.getReviews();
  }

  getReviews() {
    this.http.get(this.constant.baseUrl + '/review/findReviewsByVendor', {
      params: {
        vendorId: this.service.vendorId,
        serviceId: this.service.id
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.reviewList = (res as any).result;
    });
  }

  toSetOrder(service: Service) {
    this.router.navigate(['/tabs/home/set-order', {serviceInfo: JSON.stringify(service)}]);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getReviews();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  calReviewDate(reviewTime) {
    if ((new Date().getTime() - new Date(reviewTime).getTime()) <= Number(this.reviewTime) * 24 * 60 * 60 * 1000) {
      return true;
    } else {
      return false;
    }
  }

  checkReviewStar(star) {
    if (this.reviewType === 'GOOD REVIEWS') {
      if (star >= 4) {
        return true;
      } else {
        return false;
      }
    }
    if (this.reviewType === 'MEDIUM REVIEWS') {
      if (star === 3) {
        return true;
      } else {
        return false;
      }
    }
    if (this.reviewType === 'BAD REVIEWS') {
      if (star <= 2) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
