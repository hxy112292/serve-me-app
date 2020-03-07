import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-center',
  templateUrl: './customer-center.page.html',
  styleUrls: ['./customer-center.page.scss'],
})
export class CustomerCenterPage implements OnInit {
  customerPage: any;

  constructor() {
    this.customerPage = 'customerOrder';
  }

  ngOnInit() {
  }

}
