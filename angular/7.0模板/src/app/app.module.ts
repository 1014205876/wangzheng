import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// 引入模块
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './shared/components/components.module';
import { selfHttp } from './shared/service/http-service';
// import { BaseInterceptor } from './shared/service/base-interceptor';
import { httpInterceptorProviders } from './shared/service/index';

// 引入页面
import { HomeComponent } from './pages/home/home.component';
import { EchartComponent } from './pages/echart/echart.component';
import { FormComponent } from './pages/form/form.component';
import { AnimateComponent } from './pages/animate/animate.component';
import { ThreeComponent } from './pages/three/three.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EchartComponent,
        FormComponent,
        AnimateComponent,
        ThreeComponent,
    ],
    imports: [
        BrowserModule,
        NgxEchartsModule,
        AppRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        ComponentsModule
    ],
    providers: [
        selfHttp,
        httpInterceptorProviders,
        {
            provide: NZ_I18N,
            useValue: zh_CN
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
