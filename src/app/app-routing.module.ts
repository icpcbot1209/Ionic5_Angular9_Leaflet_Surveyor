import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'targetlist',
    loadChildren: () => import('./targetlist/targetlist.module').then( m => m.TargetlistPageModule)
  },
  {
    path: 'target/:id',
    loadChildren: () => import('./target/target.module').then( m => m.TargetPageModule)
  },
  {
    path: 'camera-view',
    loadChildren: () => import('./camera-view/camera-view.module').then( m => m.CameraViewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
