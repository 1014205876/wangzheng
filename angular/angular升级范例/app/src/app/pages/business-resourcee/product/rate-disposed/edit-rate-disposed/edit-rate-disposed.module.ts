import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRateDisposedRoutingModule } from './edit-rate-disposed-routing.module';
import { EditRateDisposed } from './edit-rate-disposed.component'

import { LayoutModule } from '../../../../../layout/layout.module'
import { FormsModule } from '@angular/forms'
import { PopSerService } from '../../../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../../../shared/directive/directive.module'
import { ComponentModule } from '../../../../../shared/component/component.module'
import { RegularService } from '../../../../../shared/service/regular/regular.service';

@NgModule({
  imports: [
    CommonModule,
    EditRateDisposedRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ComponentModule
  ],
  declarations: [EditRateDisposed],
  providers: [PopSerService, HttpService, ApiService, RegularService]
})
export class EditRateDisposedModule { }
