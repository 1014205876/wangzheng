import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigureComponent } from './configure.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigureComponent,
    data: {
      title: '应用管理 - 系统设置',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigureRoutingModule { }
