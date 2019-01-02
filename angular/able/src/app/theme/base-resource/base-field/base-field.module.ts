
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFieldComponent } from './base-field.component';

import { BaseFieldRoutingModule } from './base-field-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { FileUploadModule } from 'ng2-file-upload';

import { HttpServe } from './../../../layout/service/http-serve.service';

@NgModule({
  imports: [
    CommonModule,
    BaseFieldRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    FileUploadModule
  ],
  declarations: [BaseFieldComponent],
  providers: [HttpServe]
})
export class BaseFieldModule { }
