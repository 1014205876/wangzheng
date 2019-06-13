import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthorizeInfoComponent } from './authorize-info.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../shared/component/component.module';
import { HttpService } from '../../../shared/service/http-serve.service';

import { SwiperModule } from 'ngx-swiper-wrapper';  
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';  
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';  

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {  
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 30,
  slidesPerView: 1
}; 

const routes:Routes = [
  {path: '', component: AuthorizeInfoComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    RouterModule.forChild(routes),
    SwiperModule
  ],
  providers:[HttpService,
    {
      provide: SWIPER_CONFIG,  
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  declarations: [AuthorizeInfoComponent]
})
export class AuthorizeInfoModule { }
