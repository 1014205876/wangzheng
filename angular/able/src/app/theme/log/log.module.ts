import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log.component';
import { LogRoutingModule } from './log-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpServe } from './../../layout/service/http-serve.service';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ToastyModule.forRoot()
  ],
  declarations: [LogComponent],
  providers: [HttpServe]
})
export class LogModule { }
