import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** 引入外部插件 */
/** 引入ng-zorro */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
 
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

import { PageNavComponent } from './page-nav/page-nav.component';
import { PicScaleComponent } from './pic-scale/pic-scale.component';

import { HtmlPipePipe } from './pipe/html-pipe.pipe';
import { ImgCarouselComponent } from './img-carousel/img-carousel.component';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';

@NgModule({
  declarations: [
    PageNavComponent,
    PicScaleComponent,
    HtmlPipePipe,
    ImgCarouselComponent,
    TinyEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SwiperModule
  ],
  exports: [
    PageNavComponent,
    PicScaleComponent,
    HtmlPipePipe,
    ImgCarouselComponent,
    TinyEditorComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ComponentModule { }
