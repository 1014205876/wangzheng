import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { EmployeeAddRoutingModule } from './employee-add-routing.module';
import { EmployeeAddComponent } from './employee-add.component'

import { PopSerService } from '../../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../../shared/service/http-serve/api.service'
import { RegularService } from '../../../../shared/service/regular/regular.service';

import { LayoutModule } from '../../../../layout/layout.module'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentModule } from '../../../../shared/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    EmployeeAddRoutingModule,
    LayoutModule,
    NgZorroAntdModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EmployeeAddComponent],
  providers: [PopSerService, HttpService, ApiService, RegularService]
})
export class EmployeeAddModule { }
