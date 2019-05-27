import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpInterceptorModule } from 'ng-http-interceptor';

/** 引入外部插件 */
/** 引入ng-zorro */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import { AdminComponent } from './admin/admin.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AdminComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpInterceptorModule,
    NgZorroAntdModule,
    RouterModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  exports: [
    BreadcrumbsComponent
  ]
})
export class LayoutModule { }
