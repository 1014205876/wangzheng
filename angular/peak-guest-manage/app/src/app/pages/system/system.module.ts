import { ComponentModule } from '../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const routes: Routes = [
  {
    path: '', component: SystemComponent, children: [
      { path: '', redirectTo: '' },
      {
        path: 'banner', loadChildren: 'app/pages/system/banner/banner.module#BannerModule', data: {
          breadcrumb: ['内容管理', 'banner管理']
        }
      },
      {
        path: 'help', loadChildren: 'app/pages/system/help/help.module#HelpModule', data: {
          breadcrumb: ['内容管理', '帮助管理']
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forChild(routes),
    SwiperModule
  ],
  declarations: [SystemComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SystemModule { }
