import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

/** 引入ng-zorro */
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';

/** 注册语言包 */
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { TransformService } from './../shared/service/transform.service';

import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { FormDateTimeComponent } from './components/form-date-time/form-date-time.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    DynamicFormComponent, 
    DynamicFieldDirective,
    FormInputComponent, 
    FormRadioComponent, 
    FormSelectComponent, 
    FormTextareaComponent, 
    FormDateComponent, 
    FormDateTimeComponent 
  ],
  entryComponents: [
    FormInputComponent, 
    FormRadioComponent, 
    FormSelectComponent, 
    FormTextareaComponent, 
    FormDateComponent, 
    FormDateTimeComponent
  ],
  exports: [
    DynamicFormComponent,
  ],
  providers: [
    TransformService,
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class DynamicFormModule { }
