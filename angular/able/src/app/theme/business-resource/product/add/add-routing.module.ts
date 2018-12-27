import { NgModule } from '@angular/core';
import { AddComponent } from './add.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddComponent,
    data: {
      title: '产品管理 - 创建产品',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule { }
