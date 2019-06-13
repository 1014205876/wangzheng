import { PicScaleComponent } from './pic-scale/pic-scale.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrumbComponent } from './crumb/crumb.component';
import {CalendarModule} from 'primeng/primeng';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { PageNavComponent } from './page-nav/page-nav.component';
import { ComfirmComponent } from './comfirm/comfirm.component';
import { ResourceDirective } from './directive/resource.directive';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';
import { DialogComponent } from './dialog/dialog.component';
import { LoadingComponent } from './loading/loading.component';
 
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CalendarModule,
    SwiperModule
  ],
  declarations: [
    CrumbComponent, 
    CalendarComponent, 
    PageNavComponent, 
    ComfirmComponent,
    PicScaleComponent,
    ResourceDirective,
    TinyEditorComponent,
    DialogComponent,
    LoadingComponent
  ],
  exports:[
    CrumbComponent,
    CalendarComponent,
    PageNavComponent,
    ComfirmComponent,
    PicScaleComponent,
    ResourceDirective,
    TinyEditorComponent,
    DialogComponent
  ],
  providers:[
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ComponentModule { }
