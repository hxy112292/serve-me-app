import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressAddPageRoutingModule } from './address-add-routing.module';

import { AddressAddPage } from './address-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressAddPageRoutingModule
  ],
  declarations: [AddressAddPage]
})
export class AddressAddPageModule {}
