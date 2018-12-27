import { NgModule } from '@angular/core';
import { AreaComponent } from './area.component';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  {
    path: '',
    component: AreaComponent,
    data: {
      title: '行政区划管理',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }
