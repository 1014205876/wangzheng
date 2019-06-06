import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseFieldRoutingModule } from './base-field-routing.module';
import { BaseFieldComponent } from './base-field.component'

import { LayoutModule } from '../../../layout/layout.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { PopSerService } from '../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../shared/directive/directive.module'
import { ComponentModule } from '../../../shared/component/component.module'
import { FileUploadModule } from 'ng2-file-upload'


@NgModule({
  imports: [
    CommonModule,
    BaseFieldRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    FileUploadModule
  ],
  declarations: [BaseFieldComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class BaseFieldModule { }
