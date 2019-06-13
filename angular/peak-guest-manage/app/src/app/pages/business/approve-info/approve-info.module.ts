import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveInfoComponent } from './approve-info.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../shared/component/component.module';
import { HttpService } from '../../../shared/service/http-serve.service';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
 
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const routes:Routes = [
  {path: '', component: ApproveInfoComponent,}
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forChild(routes),
    SwiperModule
  ],
  declarations: [ApproveInfoComponent],
  providers: [
    HttpService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ApproveInfoModule { }
