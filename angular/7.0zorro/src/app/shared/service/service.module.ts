import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 引入自定义ts组件
import { HttpServe } from './http-serve.service';

@NgModule({
  declarations: [],
  providers: [
    HttpServe
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }
