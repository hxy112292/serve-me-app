import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorServiceAddPageRoutingModule } from './vendor-service-add-routing.module';

import { VendorServiceAddPage } from './vendor-service-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorServiceAddPageRoutingModule
  ],
  declarations: [VendorServiceAddPage]
})
export class VendorServiceAddPageModule {}
