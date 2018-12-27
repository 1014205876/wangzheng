import { NgModule } from '@angular/core';
import { CooperationComponent } from './cooperation.component';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  {
    path: '',
    component: CooperationComponent,
    data: {
      title: '合作机构管理',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CooperationRoutingModule { }
