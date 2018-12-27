import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorityComponent } from './authority.component';
import { AuthorityRoutingModule } from './authority-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { ToastyModule } from 'ng2-toasty';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    AuthorityRoutingModule,
    SharedModule,
    NgxDatatableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    TreeModule
  ],
  declarations: [AuthorityComponent],
  providers: [HttpServe]
})
export class AuthorityModule { }
