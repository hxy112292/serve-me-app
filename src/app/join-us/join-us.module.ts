import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinUsPageRoutingModule } from './join-us-routing.module';

import { JoinUsPage } from './join-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinUsPageRoutingModule
  ],
  declarations: [JoinUsPage]
})
export class JoinUsPageModule {}
