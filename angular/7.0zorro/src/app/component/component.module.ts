import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AdminComponent } from './admin/admin.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavComponent,
    MenuComponent,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgZorroAntdModule,
  ],
  exports: [
    AdminComponent,
    NavComponent,
  ],
})
export class ComponentModule { }
