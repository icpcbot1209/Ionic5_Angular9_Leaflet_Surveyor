import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamviewPage } from './camview.page';

const routes: Routes = [
  {
    path: '',
    component: CamviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamviewPageRoutingModule {}
