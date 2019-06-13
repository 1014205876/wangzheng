import { DateTransformService } from '../../../shared/service/date-transform.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../shared/service/http-serve.service';
import { ComponentModule } from '../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishproductComponent } from './publishproduct.component';
import { ToastyModule } from 'ng2-toasty';//引入提示弹窗插件

const routes: Routes = [
  {path: '', component: PublishproductComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    ToastyModule.forRoot(),
  ],
  declarations: [PublishproductComponent],
  providers: [HttpService,DateTransformService]
})
export class PublishproductModule { }
