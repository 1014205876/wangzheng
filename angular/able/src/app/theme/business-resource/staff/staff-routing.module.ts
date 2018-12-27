import { NgModule } from '@angular/core';
import { StaffComponent } from './staff.component';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    data: {
      title: '机构人员管理',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
