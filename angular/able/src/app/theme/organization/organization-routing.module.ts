import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '组织架构',
      status: false
    },
    children: [
      {
        path: 'department',
        loadChildren: './department/department.module#DepartmentModule'
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#EmployeeModule'
      },
      {
        path: 'employee/add',
        loadChildren: './employee/add/add.module#AddModule'
      },
      {
        path: 'employee/modify',
        loadChildren: './employee/modify/modify.module#ModifyModule'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
