import { DateTransformService } from '../../../shared/service/date-transform.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../shared/service/http-serve.service';
import { ComponentModule } from '../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookComponent } from './look.component';

const routes: Routes = [
  {path: '', component: LookComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LookComponent],
  providers: [HttpService,DateTransformService]
})
export class LookModule { }
