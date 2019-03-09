import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/** 引入外部插件 */
/** 引入ng-zorro */
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';

// 引入页面
import { HomeComponent } from './pages/home/home.component';
import { EchartComponent } from './pages/echart/echart.component';
import { ModelComponent } from './pages/model/model.component';
import { TableComponent } from './pages/table/table.component';

// 引入模块
import { LayoutModule } from './layout/layout.module';
import { ComponentModule } from './shared/component/component.module';
import { ServiceModule } from './shared/service/service.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EchartComponent,
        ModelComponent,
        TableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LayoutModule,
        ComponentModule,
        ServiceModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }