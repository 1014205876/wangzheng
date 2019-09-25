import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** 引入插件 */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { ViewPictureComponent } from '../view-picture/view-picture.component';

import { DynaactionFormComponent } from './dynaaction-form.component';
import { FormCheckComponent } from './component/form-check/form-check.component';
import { FormDateComponent } from './component/form-date/form-date.component';
import { FormInputComponent } from './component/form-input/form-input.component';
import { FormPicComponent } from './component/form-pic/form-pic.component';
import { FormRadioComponent } from './component/form-radio/form-radio.component';
import { FormSelectComponent } from './component/form-select/form-select.component';
import { FormTimeComponent } from './component/form-time/form-time.component';

@NgModule({
    declarations: [
        ViewPictureComponent,
        DynaactionFormComponent,
        FormCheckComponent,
        FormDateComponent,
        FormInputComponent,
        FormPicComponent,
        FormRadioComponent,
        FormSelectComponent,
        FormTimeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    providers: [
        { 
            provide: NZ_I18N, 
            useValue: zh_CN 
        },
    ],
    exports: [
        ViewPictureComponent,
        DynaactionFormComponent,
        FormCheckComponent,
        FormDateComponent,
        FormInputComponent,
        FormPicComponent,
        FormRadioComponent,
        FormSelectComponent,
        FormTimeComponent
    ]
})
export class DynaactionFormModule { }
