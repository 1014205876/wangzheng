import { DateTransformService } from '../../../shared/service/date-transform.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../shared/service/http-serve.service';
import { ComponentModule } from '../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';
import { UiSwitchModule } from 'ng2-ui-switch';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';//引入富文本插件
import { ToastyModule } from 'ng2-toasty';//引入提示弹窗插件

const routes: Routes = [
  {path: '', component: BannerComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    UiSwitchModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    CKEditorModule,
    ToastyModule.forRoot(),
    FileUploadModule
  ],
  declarations: [BannerComponent],
  providers: [HttpService,DateTransformService]
})
export class BannerModule { }
