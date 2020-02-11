import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Point} from '../entity/point';

@Component({
  selector: 'app-point',
  templateUrl: './point.page.html',
  styleUrls: ['./point.page.scss'],
})
export class PointPage implements OnInit {

  pointTotal: number;
  pointList: Point[];

  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.pointTotal = 0;
  }

  ngOnInit() {
    this.getPoints();
  }

  getPoints() {
    this.http.get(this.constant.baseUrl + '/point/findPointByUser', {
      params: {
        userId: this.constant.getUser().id
      }
    }).subscribe( res => {
      this.pointList = (res as any).result;
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < this.pointList.length; i++) {
        this.pointTotal += this.pointList[i].point;
      }
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.pointTotal = 0;
    this.getPoints();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
