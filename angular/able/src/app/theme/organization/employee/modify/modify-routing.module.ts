import { ModifyComponent } from './modify.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ModifyComponent,
    data: {
      title: '员工管理 - 编辑员工',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyRoutingModule { }
