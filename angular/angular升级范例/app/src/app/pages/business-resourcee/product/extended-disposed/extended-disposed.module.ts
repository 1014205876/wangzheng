import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtendedDisposedRoutingModule } from './extended-disposed-routing.module';
import { ExtendedDisposedComponent } from './extended-disposed.component'

import { LayoutModule } from '../../../../layout/layout.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { PopSerService } from '../../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../../shared/directive/directive.module'
import { ComponentModule } from '../../../../shared/component/component.module'
import { FileUploadModule } from 'ng2-file-upload'
import { RegularService } from '../../../../shared/service/regular/regular.service';

@NgModule({
  imports: [
    CommonModule,
    ExtendedDisposedRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ComponentModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: [ExtendedDisposedComponent],
  providers: [PopSerService, HttpService, ApiService, RegularService]
})
export class ExtendedDisposedModule { }
