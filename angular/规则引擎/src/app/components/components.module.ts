
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { HttpServe } from '../layout/service/http-serve.service';


import { AdminComponent } from './admin/admin.component';
import { ResourceDirective } from './directive/resource.directive';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AdminComponent,
    ResourceDirective,
    HeaderComponent,
    MenuComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    HttpModule,
    HttpInterceptorModule,
  ],
  providers: [
    HttpServe
  ],
  exports: [
    HeaderComponent,
    MenuComponent
  ]
})
export class ComponentsModule { }
