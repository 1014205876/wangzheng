import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '基础资源管理',
      status: false
    },
    children: [
      {
        path: 'industry',
        loadChildren: './industry/industry.module#IndustryModule'
      },
      {
        path: 'area',
        loadChildren: './area/area.module#AreaModule'
      },
      {
        path: 'dictionary',
        loadChildren: './dictionary/dictionary.module#DictionaryModule'
      },
      {
        path: 'dictionary/item',
        loadChildren: './dictionary/item/item.module#ItemModule'
      },
      {
        path: 'baseField',
        loadChildren: './base-field/base-field.module#BaseFieldModule'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseResourceRoutingModule { }
