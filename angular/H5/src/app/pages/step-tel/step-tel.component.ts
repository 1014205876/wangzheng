import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';
import global from '../../shared/global';
@Component({
  selector: 'app-step-tel',
  templateUrl: './step-tel.component.html',
  styleUrls: ['./step-tel.component.css']
})
export class StepTelComponent implements OnInit {
  tel;
  code;
  sendCd= 60;
  canSendCode= true;
  constructor(private http: HttpService) { }

  ngOnInit() {
  }
  formSubmit(e){
    if (!this.tel) {
      alert('请输入手机号');
      return;
    }
    if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/.test(this.tel))) {
      alert('请输入正确的手机号');
      return;
    }
    if (!this.code) {
      alert('请输入验证码');
      return;
    }
    this.http.get('/v2/app/pre/verSmsCode?mobile='+this.tel+'&smsCode='+this.code)
    .subscribe(e=>{
      if (e.code != '200') {
        alert(e.reason)
        return;
      }else{}
      global.etpc.idMobileCer.mobile=this.tel;
      history.back();
    });
  }
  sendCode(){
    if (!this.tel) {
      alert('请输入手机号');
      return;
    }
    if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/.test(this.tel))) {
      alert('请输入正确的手机号');
      return;
    }
    let _this = this;
    let count = 60;
    this.canSendCode= false;
    this.http.get('/v2/app/pre/smsCode?mobile='+this.tel)
    .subscribe();
    let timeId = setInterval(function () {
      console.log(1)
      _this.sendCd= --count;
      if (count < 0) {
        _this.canSendCode= true;
        _this.sendCd= 60;
        clearInterval(timeId);
      }
    }, 1000)
  }
}
