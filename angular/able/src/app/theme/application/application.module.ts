
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

import { HttpServe } from './../../layout/service/http-serve.service';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ApplicationRoutingModule,
    SharedModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ],
  declarations: [ApplicationComponent],
  providers: [HttpServe]
})
export class ApplicationModule { }
