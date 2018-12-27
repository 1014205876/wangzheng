import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorityComponent} from './authority.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorityComponent,
    data: {
      title: '权限管理',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorityRoutingModule { }
