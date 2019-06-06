/** 引入angular依赖 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'

import { LayoutModule } from './layout/layout.module'
import { ApiService } from './shared/service/http-serve/api.service'
import { HttpService } from './shared/service/http-serve/http.service'
import { PopSerService } from './shared/service/pop-ser/pop-ser.service'
import { AppLoadModule } from './shared/service/app-load/app-load.module';
import { PlatformSelectComponent } from './pages/platform-select/platform-select.component'
import { ErrorComponent } from './pages/error/error.component';

import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);



@NgModule({
  declarations: [
    AppComponent,
    PlatformSelectComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    LayoutModule,
    AppLoadModule

  ],
  bootstrap: [AppComponent],
  providers: [PopSerService, ApiService, HttpService, { provide: NZ_I18N, useValue: zh_CN }]
})
export class AppModule { }
