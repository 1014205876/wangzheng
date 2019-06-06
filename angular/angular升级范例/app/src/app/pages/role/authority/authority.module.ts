import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorityRoutingModule } from './authority-routing.module';
import { AuthorityComponent } from './authority.component'

import { PopSerService } from '../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LayoutModule } from '../../../layout/layout.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DirectiveModule } from '../../../shared/directive/directive.module'
import { ComponentModule } from '../../../shared/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    AuthorityRoutingModule,
    LayoutModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    ComponentModule
  ],
  declarations: [AuthorityComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class AuthorityModule { }
