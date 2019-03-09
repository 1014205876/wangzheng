import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  loading=false;

  @Input()
  config: any[] = [];
  @Input() childBtn;

  form: FormGroup;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  @Output() callBack = new EventEmitter();

  hidden=false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // 接口联调时，删除代码
    if(this.config){
      this.form = this.createGroup();
    }
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (!changes['config'].firstChange) {
      this.form = this.createGroup();
    }
  }
  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => {
      if(control.controlList&&control.controlList.length>0){
        if(control.groupShow=='0'){
          control.controlList.forEach(item => {
            let valida = [];
            if (item.require=='1') {
              if (item.type == 'radio-buttons' || item.type == 'select' || item.type == 'dayTime') {
                valida.push(this.hasValue);
              }else {
                valida.push(Validators.required);
              }
            }
            if(sessionStorage[item.controlKey]){
              item.value=sessionStorage[item.controlKey];
            }
            group.addControl(item.controlKey, this.fb.control('', valida));
          })
        }else{
          control.strConfig=JSON.stringify(control);
        }
      }else{
        let valida = [];
        if (control.require=='1') {
          if (control.type == 'radio-buttons' || control.type == 'select' || control.type == 'dayTime') {
            valida.push(this.hasValue);
          }else {
            valida.push(Validators.required);
          }
        }
        if(sessionStorage[control.controlKey]){
          control.value=sessionStorage[control.controlKey];
        }
        group.addControl(control.controlKey, this.fb.control('', valida));
      }
    });
    return group;
  }
  hasValue(c: AbstractControl) {
    if (!c.value) {
      return { hasValue: true };
    }
    return null;
  }


  cal(form){
    // window.history.back()
    this.callBack.emit();
  }

}
