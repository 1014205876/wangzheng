
import { NgModule } from '@angular/core';
import { BaseFieldComponent } from './base-field.component';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  {
    path: '',
    component: BaseFieldComponent,
    data: {
      title: '基础字段管理',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseFieldRoutingModule { }
