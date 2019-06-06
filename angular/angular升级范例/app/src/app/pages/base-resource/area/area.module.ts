import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component'

import { LayoutModule } from '../../../layout/layout.module'
import { FormsModule } from '@angular/forms'
import { PopSerService } from '../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../shared/directive/directive.module'
import { ComponentModule } from '../../../shared/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    AreaRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ComponentModule
  ],
  declarations: [AreaComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class AreaModule { }
