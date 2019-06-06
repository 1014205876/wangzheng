import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryItemRoutingModule } from './dictionary-item-routing.module';
import { DictionaryItemComponent } from './dictionary-item.component'

import { LayoutModule } from '../../../../layout/layout.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PopSerService } from '../../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../../shared/directive/directive.module'
import { ComponentModule } from '../../../../shared/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    DictionaryItemRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule
  ],
  declarations: [DictionaryItemComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class DictionaryItemModule { }
