import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';


import { Pages02Component } from '../pages02/pages02.component';

const routes: Routes = [
  { path: 'pages2', component: Pages02Component },
];
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //声明变量的类型
  private loginData:any;
  // private userName: string;
  // private passWord: string;
  // private remember: boolean;
  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    this.loginData={
      userName:'123',
      passWord:'123',
      remember:false,
    }
  }
  login() {
    if (this.loginData.userName == '123') {
      console.log('用户名正确');
      if (this.loginData.passWord == '123') {
        console.log('密码正确');
        this.router.navigate(['/pages2']);
      } else {
        console.log('密码错误');
      }
    } else {
      console.log('用户名错误');
    }
  }
}
