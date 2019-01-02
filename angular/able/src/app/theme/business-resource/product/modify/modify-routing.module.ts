import { NgModule } from '@angular/core';
import { ModifyComponent } from './modify.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ModifyComponent,
    data: {
      title: '产品管理 - 编辑产品',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyRoutingModule { }
