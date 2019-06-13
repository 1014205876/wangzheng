// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })
import { DateTransformService } from '../../../shared/service/date-transform.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../shared/service/http-serve.service';
import { ComponentModule } from '../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanInputComponent } from './loan-input.component';
import { ToastyModule } from 'ng2-toasty'


const routes: Routes = [
  { path: '', component: LoanInputComponent }
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    ToastyModule.forRoot()
  ],
  declarations: [LoanInputComponent],
  providers: [HttpService, DateTransformService]
})
export class LoanInputModule { }
