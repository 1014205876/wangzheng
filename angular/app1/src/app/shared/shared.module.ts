import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** 引入外部插件 */
/** 引入ng-zorro */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import { AuthService } from './auth/auth.service';
import { AuthGuardGuard } from './auth-guard/auth-guard.guard';
import { MenuResourceDirective } from './directive/menu-resource.directive';
import { ComponentModule } from './component/component.module';
import { HttpServe } from './service/http-serve.service';
import { TransformService } from './service/transform.service';
import { AppLoadModule } from './service/app-load.module';

@NgModule({
  declarations: [
    MenuResourceDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ComponentModule,
    AppLoadModule
  ],
  exports: [
    MenuResourceDirective,
    ComponentModule
  ],
  providers: [
      HttpServe,
      AuthGuardGuard,
      AuthService,
      TransformService,
      { provide: NZ_I18N, useValue: zh_CN }
  ],
})
export class SharedModule { }
