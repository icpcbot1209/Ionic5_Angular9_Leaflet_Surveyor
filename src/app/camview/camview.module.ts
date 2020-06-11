import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamviewPageRoutingModule } from './camview-routing.module';

import { CamviewPage } from './camview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamviewPageRoutingModule
  ],
  declarations: [CamviewPage]
})
export class CamviewPageModule {}
