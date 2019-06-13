import { DateTransformService } from './../../../shared/service/date-transform.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ComponentModule } from './../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreLetterComponent } from './pre-letter.component';

const routes: Routes = [
  {path: '', component: PreLetterComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreLetterComponent],
  providers: [HttpService,DateTransformService]
})
export class PreLetterModule { }
