import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';//ngif，ngfor等
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//动画

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';

import { IndexComponent } from '../index/index.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
];

@NgModule({
  declarations: [
    IndexComponent
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    HttpInterceptorModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [
  ]
})
export class IndexModule { }
