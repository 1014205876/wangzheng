import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentModule } from '../component/component.module';

import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { EchartComponent } from './echart/echart.component';

@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    EchartComponent
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    PagesRoutingModule,
    ComponentModule,
  ],
  exports:[
    ComponentModule,

  ]
})
export class PagesModule { }
