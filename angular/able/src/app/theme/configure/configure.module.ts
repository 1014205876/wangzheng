
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureComponent } from './configure.component';
import { ConfigureRoutingModule } from './configure-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';//引入提示弹窗插件
import { HttpServe } from '../../layout/service/http-serve.service';
import { CKEditorModule } from 'ng2-ckeditor';//引入富文本插件
import { FileUploadModule } from 'ng2-file-upload';
import { NgxEchartsModule } from 'ngx-echarts'
@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ConfigureRoutingModule,
    SharedModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    CKEditorModule,
    FileUploadModule,
    NgxEchartsModule
  ],
  declarations: [ConfigureComponent],
  providers: [HttpServe]
})
export class ConfigureModule { }
