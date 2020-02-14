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
}
