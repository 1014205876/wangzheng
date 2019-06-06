import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryComponent } from './industry.component'

import { FormsModule } from '@angular/forms'
import { LayoutModule } from '../../../layout/layout.module'
import { PopSerService } from '../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../shared/directive/directive.module'
import { ComponentModule } from '../../../shared/component/component.module'


@NgModule({
  imports: [
    CommonModule,
    IndustryRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    ComponentModule,
    FormsModule
  ],
  declarations: [IndustryComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class IndustryModule { }
