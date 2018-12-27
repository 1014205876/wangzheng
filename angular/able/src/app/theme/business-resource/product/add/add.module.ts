import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { AddRoutingModule } from './add-routing.module';

import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServe } from './../../../../layout/service/http-serve.service';
import { ToastyModule } from 'ng2-toasty';
import { DragulaModule } from 'ng2-dragula';
import { CKEditorModule } from 'ng2-ckeditor';//引入富文本插件

@NgModule({
  imports: [
    CommonModule,
    AddRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    DragulaModule,CKEditorModule
  ],
  declarations: [AddComponent],
  providers: [HttpServe]
})
export class AddModule { }
