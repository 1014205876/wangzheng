import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnInit {

  @Input() config: any[] = [];
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() callBack = new EventEmitter();

  form: FormGroup;
  btn=[];//显示按钮的数组
  hidden = false;

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    // 接口联调时，删除代码
    this.form = this.createGroup();
    // console.log(this.config)
    this.config.forEach(e => {
      if (e.placeholder == 'hidden') {
        this.hidden = true;
        this.btn=e.options;//将审批结果的数组赋值给按钮数组
      }
    })
    console.log(this.btn)
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    let that=this;
    if (!changes['config'].firstChange) {
      this.form = this.createGroup();
      this.config.forEach(e => {
        if (e.placeholder == 'hidden') {
          this.hidden = true;
          that.btn=e.options;//将审批结果的数组赋值给按钮数组
        }
      })
      console.log(that.btn)
    }
  }
  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => {
      let valida = [];
      if (control.required) {
        if (control.type == 'radio-buttons' || control.type == 'dropdown') {
          valida.push(this.hasValue);
        }
        else if (control.type == 'dayTime') {
          valida.push(this.hasValue);
        }
        else {
          valida.push(Validators.required);
        }
      }
      for (let key in control.params) {
        if (key == 'regexPattern') {
          valida.push(Validators.pattern(control.params.regexPattern));
        }
      }
      group.addControl(control.id, this.fb.control('', valida));
    });
    return group;
  }
  hasValue(c: AbstractControl) {
    if (!c.value) {
      return { hasValue: true };
    }
    return null;
  }
  cal() {
    window.history.back()
    this.callBack.emit();
  }

}
