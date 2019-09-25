import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//ngif，ngfor等
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { HttpClientModule } from '@angular/common/http';//http
import { Routes, RouterModule } from '@angular/router';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { SwiperComponent } from './swiper/swiper.component';

import { ViewPictureComponent } from '../component/view-picture/view-picture.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/swiper', pathMatch: 'full' },//默认路由
      { path: 'swiper', component: SwiperComponent },
      { path: 'index', loadChildren: './index/index.module#IndexModule' },
      { path: 'form', loadChildren: './form/form.module#FormModule' },
    ]
  }
];

@NgModule({
  declarations: [
    SwiperComponent,
    ViewPictureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
  ],
  providers: [
      {
          provide: NZ_I18N,
          useValue: zh_CN
      }
  ],
})
export class PagesModule { }
