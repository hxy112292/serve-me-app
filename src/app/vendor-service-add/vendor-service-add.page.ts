import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../entity/service';

@Component({
  selector: 'app-vendor-service-add',
  templateUrl: './vendor-service-add.page.html',
  styleUrls: ['./vendor-service-add.page.scss'],
})
export class VendorServiceAddPage implements OnInit {

  service: Service;
  privacyAgree: string;

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
  }

  addService() {
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
    if (this.privacyAgree == null || this.privacyAgree === 'false') {
      alert('you need to agree the privacy');
      return;
    }
    this.service.vendorId = this.constant.getUser().id;
    this.http.post(this.constant.baseUrl + '/service/insert', this.service).subscribe( res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.router.navigate(['tabs/me/vendor-center']);
    });
  }
}
