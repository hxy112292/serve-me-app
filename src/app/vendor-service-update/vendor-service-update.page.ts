import { Component, OnInit } from '@angular/core';
import {Service} from '../entity/service';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vendor-service-update',
  templateUrl: './vendor-service-update.page.html',
  styleUrls: ['./vendor-service-update.page.scss'],
})
export class VendorServiceUpdatePage implements OnInit {

  service: Service;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute) {

    this.service = {
      id: '',
      type: '',
      vendorId: '',
      city: '',
      price: '',
      username: '',
      star: 5,
      phone: '',
      email: ''
    };
  }

  ngOnInit() {
    this.service = JSON.parse(this.route.snapshot.paramMap.get('serviceInfo'));
  }

  updateService() {
    if (this.service.city == null || this.service.city === '') {
      alert('you need to choose a city');
      return;
    }
    if (this.service.type == null || this.service.type === '') {
      alert('you need to choose a service');
      return;
    }
    if (this.service.price == null || this.service.price === '') {
      alert('you need to set a price');
      return;
    }
    this.service.vendorId = this.constant.getUser().id;
    this.http.put(this.constant.baseUrl + '/service/update', this.service).subscribe( res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.router.navigate(['tabs/me/vendor-service']);
    });
  }

}
