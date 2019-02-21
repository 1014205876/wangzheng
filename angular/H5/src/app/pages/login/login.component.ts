import { HttpService } from './../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public yzm = false;
  public sendCd = 60;
  public insStaffNum;

  items = {
    "mobile": "",
    "yzm": ""
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private cookie: CookieService,
    private activeRoute: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      mobile: new FormControl('', Validators.pattern(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/)),
      yzm: new FormControl()
    })
    this.activeRoute.queryParams.subscribe(e => {
      console.log(e)
      this.insStaffNum = e.insStaffNum;
      console.log(this.insStaffNum)
    })
  }

  getYzm() {
    if (!this.items.mobile) {
      alert('请先输入手机号')
      return;
    }
    if (!this.loginForm.controls.mobile.valid) {
      alert('请输入正确的手机号')
      return;
    }

    // let _this=this;
    let _this1 = this;
    let count = 60;
    this.sendCd
    this.yzm = true;
    this.http.get2('/v2/app/pre/smsCode?mobile=' + this.items.mobile).subscribe()
    let timeId = setInterval(function () {
      _this1.sendCd = --count;
      if (count < 0) {
        _this1.yzm = false;
        _this1.sendCd = 60;
        clearInterval(timeId);
      }
    }, 1000)
  }

  checkYzm() {
    this.http.get2('/v2/app/pre/verSmsCode?mobile=' + this.items.mobile + '&smsCode=' + this.items.yzm)
      .subscribe(res => {
        console.log(res)
        if (res.code == '200') {
          this.cookie.put("Template", this.items.mobile, { expires: new Date(new Date().getTime() + 2505600000) })
          this.addUser();
        } else {
          alert(res.reason);
          return;
        }
      })
  }

  addUser() {
    this.http.post('/v2/app/pre/user', { "insStaffNum": this.insStaffNum ? this.insStaffNum : '' }).subscribe(res => {
      console.log(res)
      if (res.code == '200') {
        this.router.navigate(['/home'])
      }
    })
  }

  ngOnInit() {
  }
}
