import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TargetlistPage } from './targetlist.page';

const routes: Routes = [
  {
    path: '',
    component: TargetlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetlistPageRoutingModule {}
