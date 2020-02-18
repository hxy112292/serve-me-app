import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Service} from '../entity/service';
import {Order} from '../entity/order';

@Component({
  selector: 'app-vendor-service',
  templateUrl: './vendor-service.page.html',
  styleUrls: ['./vendor-service.page.scss'],
})
export class VendorServicePage implements OnInit {

  serviceList: Service[];

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {
    this.getServiceByVendorId();
  }

  getServiceByVendorId() {
    this.http.get(this.constant.baseUrl + '/service/findServiceByVendorId', {
      params: {
        vendorId: this.constant.getUser().id
      }
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.serviceList = (res as any).result;
    }
    );
  }

  async deleteService(serviceId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Do you want to delete this service?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.http.delete(this.constant.baseUrl + '/service/delete', {
              params: {
                id: serviceId
              }
            }).subscribe(res => {this.getServiceByVendorId(); });
          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getServiceByVendorId();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  addService() {
    this.router.navigate(['tabs/me/vendor-center/vendor-service-add']);
  }

  toUpdateService(service: Service) {
    this.router.navigate(['tabs/me/vendor-center/vendor-service-update', {serviceInfo: JSON.stringify(service)}]);
  }
}
