import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressUpdatePageRoutingModule } from './address-update-routing.module';

import { AddressUpdatePage } from './address-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressUpdatePageRoutingModule
  ],
  declarations: [AddressUpdatePage]
})
export class AddressUpdatePageModule {}
