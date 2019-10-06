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
import { HttpService } from './shared/service/http-service';
import { AppLoadModule } from './shared/service/app-load/app-load.module';
import { WebSocketService } from './shared/service/webSocket/websocket.service';
// 引入页面
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { UploadComponent } from './pages/upload/upload.component';
import { UserCenterComponent } from './pages/user-center/user-center.component';
import { LoginComponent } from './pages/login/login.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { SaoleiComponent } from './pages/saolei/saolei.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        FormComponent,
        UploadComponent,
        UserCenterComponent,
        CalendarComponent,
        SaoleiComponent,
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
        ComponentsModule,
        AppLoadModule
    ],
    providers: [
        HttpService,
        WebSocketService,
        {
            provide: NZ_I18N,
            useValue: zh_CN
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
