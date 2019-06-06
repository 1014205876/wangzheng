import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeefieldRoutingModule } from './seefield-routing.module';
import { SeefieldComponent } from './seefield.component'

import { LayoutModule } from '../../../../layout/layout.module'
import { PopSerService } from '../../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    SeefieldRoutingModule,
    NgZorroAntdModule,
    LayoutModule
  ],
  declarations: [SeefieldComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class SeefieldModule { }
