import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

// 引入布局组件
import { AdminComponent } from './layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
