
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '角色权限',
      status: false
    },
    children: [
      {
        path: 'authority',
        loadChildren: './authority/authority.module#AuthorityModule'
      },
      {
        path: 'role-manage',
        loadChildren: './role-manage/role-manage.module#RoleManageModule'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
