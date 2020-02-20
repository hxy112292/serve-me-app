import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Point} from '../entity/point';
import { Order } from '../entity/order';

@Component({
  selector: 'app-point',
  templateUrl: './point.page.html',
  styleUrls: ['./point.page.scss'],
})
export class PointPage implements OnInit {

  pointTotal: number;
  pointList: Point[];
  reason: any;

  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.pointTotal = 0;
  }

  ngOnInit() {

  }

}
