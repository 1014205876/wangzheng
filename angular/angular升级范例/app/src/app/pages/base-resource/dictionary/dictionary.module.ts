import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './dictionary.component'

import { LayoutModule } from '../../../layout/layout.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PopSerService } from '../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../shared/directive/directive.module'
import { ComponentModule } from '../../../shared/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule
  ],
  declarations: [DictionaryComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class DictionaryModule { }
