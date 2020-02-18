import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-center',
  templateUrl: './vendor-center.page.html',
  styleUrls: ['./vendor-center.page.scss'],
})
export class VendorCenterPage implements OnInit {
  vendorPage: string;

  constructor() {
    this.vendorPage = 'vendorOrder';
  }

  ngOnInit() {
  }

}
