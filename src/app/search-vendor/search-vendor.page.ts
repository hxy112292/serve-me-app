import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {forEach} from '@angular-devkit/schematics';

@Component({
  selector: 'app-search-vendor',
  templateUrl: './search-vendor.page.html',
  styleUrls: ['./search-vendor.page.scss'],
})
export class SearchVendorPage implements OnInit {
  serviceList: Service[];
  star: string;
  city: string;
  service: string;
  vendorStars: string;
  starFilter: number;
  vendorName: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private constant: ConstantsService) { }

  ngOnInit() {

  }

}
