import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductModifyRoutingModule } from './product-modify-routing.module';
import { ProductModifyComponent } from './product-modify.component'

import { LayoutModule } from '../../../../layout/layout.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PopSerService } from '../../../../shared/service/pop-ser/pop-ser.service'
import { HttpService } from '../../../../shared/service/http-serve/http.service'
import { ApiService } from '../../../../shared/service/http-serve/api.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DirectiveModule } from '../../../../shared/directive/directive.module'
import { ComponentModule } from '../../../../shared/component/component.module'
// import { DragulaModule } from 'ng2-dragula'
// import { FileUploadModule } from 'ng2-file-upload'



@NgModule({
  imports: [
    CommonModule,
    ProductModifyRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    DirectiveModule,
    FormsModule,
    ComponentModule,
    ReactiveFormsModule
    // DragulaModule
  ],
  declarations: [ProductModifyComponent],
  providers: [PopSerService, HttpService, ApiService]
})
export class ProductModifyModule { }
