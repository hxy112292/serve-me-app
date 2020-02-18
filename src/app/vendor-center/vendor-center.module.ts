import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorCenterPageRoutingModule } from './vendor-center-routing.module';

import { VendorCenterPage } from './vendor-center.page';
import {VendorOrderPageModule} from '../vendor-order/vendor-order.module';
import {VendorServicePageModule} from '../vendor-service/vendor-service.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendorCenterPageRoutingModule,
        VendorOrderPageModule,
        VendorServicePageModule
    ],
  declarations: [VendorCenterPage]
})
export class VendorCenterPageModule {}
