import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { ComponentModule } from './../shared/component/component.module';

import { FormTimeComponent } from './components/form-time/form-time.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormDateTimeComponent } from './components/form-date-time/form-date-time.component';
import { FormMultiImgComponent } from './components/form-multi-img/form-multi-img.component';
import { FormMultiSelectComponent } from './components/form-multi-select/form-multi-select.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { FormPicComponent } from './components/form-pic/form-pic.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    SwiperModule,
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormTimeComponent,
    FormTextareaComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormInputComponent,
    FormDateTimeComponent,
    FormMultiImgComponent,
    FormMultiSelectComponent,
    FormDateComponent,
    FormPicComponent
  ],
  entryComponents: [
    FormTimeComponent,
    FormTextareaComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormInputComponent,
    FormDateTimeComponent,
    FormMultiImgComponent,
    FormMultiSelectComponent,
    FormDateComponent,
    FormPicComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ]
})
export class DynamicFormModule { }
