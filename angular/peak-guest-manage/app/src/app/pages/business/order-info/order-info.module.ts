import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInfoComponent } from './order-info.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../shared/component/component.module';
import { HttpService } from '../../../shared/service/http-serve.service';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  
};

const routes: Routes = [
  { path: '', component: OrderInfoComponent, }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forChild(routes),
    SwiperModule
  ],
  providers: [HttpService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  declarations: [OrderInfoComponent]
})
export class OrderInfoModule { }
