import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputComponent } from './../components/form-input/form-input.component';
import { FormRadioComponent } from './../components/form-radio/form-radio.component';
import { FormSelectComponent } from './../components/form-select/form-select.component';
import { FormTextareaComponent } from './../components/form-textarea/form-textarea.component';
import { FormDateComponent } from './../components/form-date/form-date.component';
import { FormDateTimeComponent } from './../components/form-date-time/form-date-time.component';

const components = {
  'text': FormInputComponent,
  'integer': FormInputComponent,
  'tel': FormInputComponent,
  'dropdown': FormSelectComponent,
  'multi-line-text': FormTextareaComponent,
  'radio-buttons': FormRadioComponent,
  'date': FormDateComponent,
  'hyperlink': FormInputComponent,
  'dateTime': FormDateTimeComponent,
  'dayTime': FormDateTimeComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective {

  @Input()
  config;

  @Input()
  group: FormGroup;

  component;

  constructor(
    private resolver: ComponentFactoryResolver, 
    private container: ViewContainerRef) {
  }
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
