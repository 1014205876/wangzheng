import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperationRoutingModule } from './cooperation-routing.module';
import { CooperationComponent } from './cooperation.component'

import { LayoutModule } from '../../../layout/layout.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PopSerService } from '../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../shared/directive/directive.module'
import { ComponentModule } from '../../../shared/component/component.module'
import { RegularService } from '../../../shared/service/regular/regular.service';



@NgModule({
  imports: [
    CommonModule,
    CooperationRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ComponentModule,
    ReactiveFormsModule
  ],
  declarations: [CooperationComponent],
  providers: [PopSerService, HttpService, ApiService, RegularService]
})
export class CooperationModule { }
