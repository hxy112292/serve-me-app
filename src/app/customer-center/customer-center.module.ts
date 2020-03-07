import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerCenterPageRoutingModule } from './customer-center-routing.module';

import { CustomerCenterPage } from './customer-center.page';
import {CustomerOrderPageModule} from '../customer-order/customer-order.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerCenterPageRoutingModule,
    CustomerOrderPageModule
  ],
  declarations: [CustomerCenterPage]
})
export class CustomerCenterPageModule {}
