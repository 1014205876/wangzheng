import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { PopSerService } from '../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../shared/service/http-serve/api.service'

import { LayoutModule } from '../../../layout/layout.module'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../shared/directive/directive.module'
import { ComponentModule } from '../../../shared/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    LayoutModule,
    NgZorroAntdModule,
    DirectiveModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EmployeeComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class EmployeeModule { }
