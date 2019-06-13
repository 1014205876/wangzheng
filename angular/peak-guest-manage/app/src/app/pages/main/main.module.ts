import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { ComponentModule } from '../../shared/component/component.module';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'home' },
      {
        path: 'home', loadChildren: 'app/pages/home/home.module#HomeModule', data: {
          breadcrumb: ["首页"]
        }
      },
      {
        path: 'business', loadChildren: 'app/pages/business/business.module#BusinessModule', data: {
          breadcrumb: ["业务管理"]
        }
      },
      {
        path: 'system', loadChildren: 'app/pages/system/system.module#SystemModule', data: {
          breadcrumb: ["内容管理"]
        }
      },
      {
        path: 'customer', loadChildren: 'app/pages/customer/customer.module#CustomerModule', data: {
          breadcrumb: ["注册用户管理"]
        }
      },
      {
        path: 'customer-info', loadChildren: 'app/pages/customer/customer-info/customer-info.module#CustomerInfoModule',
        data: { breadcrumb: ["注册用户管理", "用户详情"] }
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainComponent, HeaderComponent]
})
export class MainModule { }
