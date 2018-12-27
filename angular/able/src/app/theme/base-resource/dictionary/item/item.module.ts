import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';

import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedModule,
    NgxDatatableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ],
  declarations: [ItemComponent]
})
export class ItemModule { }
