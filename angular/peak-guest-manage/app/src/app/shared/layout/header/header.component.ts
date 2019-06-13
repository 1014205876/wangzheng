import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Params } from "@angular/router";
import { HttpService } from '../../service/http-serve.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './../../../../assets/icon/menu/iconfont.css',
    './../../../../assets/icon/operate/iconfont.css',
    './header.component.css']
})
export class HeaderComponent implements OnInit {

  mask=false;
  mask2=false;
  show=false;
  account;

  pwdForm: FormGroup;
  public pwd={
    origPwd: '',
    newPwd: '',
    confPwd: ''
  };
  reason;

  public orderNo;
  public userName;
  public AppList;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute,
  ) {
    this.pwdForm=new FormGroup({
      origPwd: new FormControl(),
      newPwd: new FormControl('',Validators.pattern('')),
      confPwd: new FormControl('',Validators.pattern(''))
    })
  }

  ngOnInit() {
    this.getUser();
    this.getOtherAPP();
  }

  getOtherAPP(){
    this.http.getCustomHeaders2("/api/peak-resource/v1/resource/apps/permission").subscribe(res => {
      this.AppList=res.data;
    })
  }

  getUser(){
    this.http.getCustomHeaders2('/api/peak-resource/v1/resource/users/info')
    .subscribe(res => {
      localStorage.setItem("accountw", res.account); //将account存入本地
      this.userName = res.name;
      this.account = res.account;
    })
  }

  getOff(){
    window.location.href=window.location.protocol+'//'+window.location.host+'/logout';
  } 

  search(e){
    if(this.orderNo){
      this.router.navigate(['/app/business/ordernosearch/'+this.orderNo]);
      this.orderNo=null;
    }
  }
  navShow(e){
    if(e){
      this.show=false;
    }else{
      this.show=true;
    }
  }
  reset(){
    this.pwd={
      origPwd: '',
      newPwd: '',
      confPwd: ''
    }
  }
  resetPwd(){
    this.http.patchCustomHeaders('/api/peak-resource/v1/resource/user/pass/'+this.account,{"oldPassword":this.pwd.origPwd,"newPassword":this.pwd.newPwd})
    .subscribe(res => {
      if(res.code=='200'){
        this.getOff()
      }else{
        this.reason=res.reason;
        this.mask2=true;
        this.reset();
        this.pwdForm.reset();
      }
    })
  }

}
class search {}
