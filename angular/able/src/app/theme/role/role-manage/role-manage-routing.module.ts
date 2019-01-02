import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleManageComponent} from './role-manage.component';

const routes: Routes = [
  {
    path: '',
    component: RoleManageComponent,
    data: {
      title: '角色管理',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManageRoutingModule { }
