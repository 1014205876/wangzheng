import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '业务资源管理',
      status: false
    },
    children: [
      {
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'product/add',
        loadChildren: './product/add/add.module#AddModule'
      },
      {
        path: 'product/modify',
        loadChildren: './product/modify/modify.module#ModifyModule'
      },
      {
        path: 'cooperation',
        loadChildren: './cooperation/cooperation.module#CooperationModule'
      },
      {
        path: 'staff',
        loadChildren: './staff/staff.module#StaffModule'
      },
      // {
      //   path: 'bussiness-area',
      //   loadChildren: './bussiness-area/bussiness-area.module#BussinessAreaModule'
      // }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessResourceRoutingModule { }
