import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';//路由

import { IndexComponent } from './index.component';

const routes: Routes = [
    {
      path: '',
      children: [
        { path: '', component: IndexComponent },
      ]
    }
  ];
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class IndexModule { }
