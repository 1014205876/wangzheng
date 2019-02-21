import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormTimeComponent } from './../components/form-time/form-time.component';
import { FormTextareaComponent } from './../components/form-textarea/form-textarea.component';
import { FormSelectComponent } from './../components/form-select/form-select.component';
import { FormRadioComponent } from './../components/form-radio/form-radio.component';
import { FormInputComponent } from './../components/form-input/form-input.component';
import { FormDateTimeComponent } from './../components/form-date-time/form-date-time.component';
import { FormMultiImgComponent } from './../components/form-multi-img/form-multi-img.component';
import { FormMultiSelectComponent } from './../components/form-multi-select/form-multi-select.component';
import { FormDateComponent } from './../components/form-date/form-date.component';
import { FormPicComponent } from './../components/form-pic/form-pic.component';

/**
  文本  text
  整数  integer
  数字  number
  电话  tel
  银行卡 bankCard
  网址  internet
  邮箱  email
  身份证 cardNo
  下拉选项 select
  多选     multipleSelect
  文本域   textarea
  日期     date
  时间     time
  日期+时间  dateTime
  多图     multiplePic
  单图     pic
*/
const components = {
  'text': FormInputComponent,
  'integer': FormInputComponent,
  'number': FormInputComponent,
  'tel': FormInputComponent,
  'bankCard': FormInputComponent,
  'internet': FormInputComponent,
  'email': FormInputComponent,
  'cardNo': FormInputComponent,
  'select': FormSelectComponent,
  'multipleSelect': FormMultiSelectComponent,
  'textarea': FormTextareaComponent,
  'date': FormDateComponent,
  'time': FormTimeComponent,
  'dateTime': FormDateTimeComponent,
  'multiplePic': FormMultiImgComponent,
  'pic': FormPicComponent,
  'radio': FormRadioComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective {

  @Input() config;
  @Input() group: FormGroup;

  component;

  constructor(
    private resolver: ComponentFactoryResolver, 
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    let component = components[this.config.type];
    if(!component){
      component= components['text'];
    }

    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

}
