import { NgModule } from '@angular/core';
import { ItemComponent } from './item.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    data: {
      title: '字典管理 - 字典项管理',
      status: true
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
