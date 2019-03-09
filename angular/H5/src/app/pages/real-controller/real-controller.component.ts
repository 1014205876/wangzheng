import { Component, OnInit } from '@angular/core';
import global from '../../shared/global';
import { CloneObjService } from '../../shared/service/clone-obj.service';
@Component({
  selector: 'app-real-controller',
  templateUrl: './real-controller.component.html',
  styleUrls: ['./real-controller.component.css']
})
export class RealControllerComponent implements OnInit {
  loading = false;
  hasTel = false;
  stepSwitch = false;

  controllerCer = {
    mobile: '',
    name: '',
    idCode: '',
    status: '',
    idUrl: '',
    idBackUrl: '',
    issuingAgency: '',
    validityPeriod: '',
    idBack: {
      issuingAgency: '',
      idBackUrl: "",
      validityPeriod: "",
      status: ''
    }
  };
  constructor(private clone: CloneObjService) { }

  ngOnInit() {
    if (global.etpc.controllerCer.name) {
      this.asd(global.etpc.controllerCer.mobile);
      this.controllerCer = global.etpc.controllerCer;
    }
  }
  getControllerId() {
    this.controllerCer = this.clone.deepClone(global.etpc.idMobileCer);
    this.asd(this.controllerCer.mobile);
  }
  controllerCerChange(e) {
    if (e.name != this.controllerCer.name || e.idCode != this.controllerCer.idCode){
      this.controllerCer.idBack = {
        issuingAgency: '',
        idBackUrl: "",
        validityPeriod: "",
        status: ''
      };
    }
    for (let key in e) {
      this.controllerCer[key] = e[key];
    }
  }
  idBackChange(e) {
    this.controllerCer.idBack = e;
  }

  stepOne() {
    if (!this.controllerCer.mobile) {
      alert('请输入手机号码！');
      return;
    }
    if (!this.controllerCer.name) {
      alert('请验证大股东/实际控制人身份证正面信息！');
      return;
    }
    if (!this.controllerCer.idBack.issuingAgency) {
      alert('请验证大股东/实际控制人身份证反面信息！');
      return;
    }
    for (let key in this.controllerCer) {
      global.etpc.controllerCer[key] = this.controllerCer[key];
    }
    global.etpc.controllerCer.idBack = this.controllerCer.idBack;
    history.back();
  }

  asd(e) {
    this.controllerCer.mobile = e;
    if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.controllerCer.mobile))) {
      this.hasTel = false
    } else {
      this.hasTel = true
    }
  }

}
