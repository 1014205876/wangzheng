import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from './log.component'

import { PopSerService } from '../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../shared/service/http-serve/http.service'
import { ApiService } from '../../shared/service/http-serve/api.service'
import { FormsModule } from '@angular/forms'

import { LayoutModule } from '../../layout/layout.module'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentModule } from '../../shared/component/component.module';
import { DateTransformService } from '../../shared/service/date-transform/date-transform.service';


@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    LayoutModule,
    NgZorroAntdModule,
    ComponentModule,
    FormsModule
  ],
  declarations: [LogComponent],
  providers: [PopSerService, HttpService, ApiService, DateTransformService]
})
export class LogModule { }
