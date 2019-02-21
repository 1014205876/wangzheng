import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import global from '../../../shared/global';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {

  config: any;
  group: FormGroup;
  strConfig;

  constructor() { }

  ngOnInit() {
    // console.log(this.config)
    if(this.config.groupShow=='1'){
      this.strConfig=JSON.stringify(this.config);
    }
  }
/**
  文本  text
  整数  integer
  数字  number
  电话  tel
  银行卡 bankCard
  网址  internet
  邮箱  email
  身份证 cardNo
*/
  change(){
    if(this.config.type=='integer'){
      if(this.config.value&&(!(/(^[1-9]\d*$)/).test(this.config.value))){
        alert('请输入整数！')
        this.config.value="";
        global.loan.stepSwitch=true;
      }
    }
    if(this.config.type=='tel'){
      if(this.config.value&&!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.config.value))){
        alert('请输入正确的手机号码！')
        this.config.value="";
        global.loan.stepSwitch=true;
      }
    }
    if(this.config.type=='bankCard'){
      if(this.config.value&&!(/^([1-9]{1})(\d{14}|\d{18})$/.test(this.config.value))){
        alert('请输入正确的银行卡号码！')
        this.config.value="";
        global.loan.stepSwitch=true;
      }
    }
    if(this.config.type=='internet'){
      if(this.config.value&&!(/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(this.config.value))){
        alert('请输入正确的网址！')
        this.config.value="";
        global.loan.stepSwitch=true;
      }
    }
    if(this.config.type=='email'){
      if(this.config.value&&!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.config.value))){
        alert('请输入正确的邮箱！')
        this.config.value="";
        global.loan.stepSwitch=true;
      }
    }
    if(this.config.type=='cardNo'){
      if(this.config.value&&!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.config.value))){
        alert('请输入正确的身份证号码！')
        this.config.value="";
        global.loan.stepSwitch=true;
      }
    }
    if(this.config.value){
      global.loan.stepSwitch=false;
      sessionStorage[this.config.controlKey]=this.config.value;
    }
  }
}
