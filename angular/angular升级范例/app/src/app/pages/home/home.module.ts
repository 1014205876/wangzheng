import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component'

import { LayoutModule } from '../../layout/layout.module'
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ApiService } from '../../shared/service/http-serve/api.service'
import { HttpService } from '../../shared/service/http-serve/http.service'
import { PopSerService } from '../../shared/service/pop-ser/pop-ser.service'

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    NgZorroAntdModule
  ],
  declarations: [HomeComponent],
  providers: [ApiService, HttpService, PopSerService]
})
export class HomeModule { }
