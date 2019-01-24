import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';

import { HttpModule } from '@angular/http';
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
    NavComponent,
  ],
  providers: [
    HttpServe,
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HttpModule,
    HttpInterceptorModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [
    AdminComponent,
    ResourceDirective,
    HeaderComponent,
    MenuComponent,
    NavComponent,
  ],
})
export class ComponentModule { }
