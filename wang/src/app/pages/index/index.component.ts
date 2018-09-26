import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';


import { Pages02Component } from '../pages02/pages02.component';

const routes: Routes = [
  { path: 'pages2', component: Pages02Component },
];
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  private userName: string;
  private passWord: string;
  private remember: boolean;
  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    this.userName = '';
    this.passWord = '';
    this.remember = false;
  }
  login() {
    if (this.userName == '123') {
      console.log('用户名正确');
      if (this.passWord == '123') {
        console.log('密码正确');
        this.router.navigate(['/pages2']);
      } else {
        console.log('密码正确');
      }
    } else {
      console.log('密码错误');
    }
  }
}
