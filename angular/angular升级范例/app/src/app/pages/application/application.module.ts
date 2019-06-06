import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component'

import { ApplicationRoutingModule } from './application-routing.module';
import { PopSerService } from '../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../shared/service/http-serve/http.service'
import { ApiService } from '../../shared/service/http-serve/api.service'

import { LayoutModule } from '../../layout/layout.module'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DirectiveModule } from '../../shared/directive/directive.module'
import { ComponentModule } from '../../shared/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    LayoutModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    ComponentModule
  ],
  declarations: [ApplicationComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class ApplicationModule { }
