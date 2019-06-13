import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ComponentModule } from './../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeComponent } from './authorize.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
 
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const routes: Routes=[
  {path: '', component: AuthorizeComponent}
]

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes),
    SwiperModule
  ],
  declarations: [AuthorizeComponent],
  providers: [
    HttpService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class AuthorizeModule { }
