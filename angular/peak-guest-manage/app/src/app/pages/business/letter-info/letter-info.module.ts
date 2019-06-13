
import { ComponentModule } from './../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterInfoComponent } from './letter-info.component';
import { HttpService } from './../../../shared/service/http-serve.service';
import { FormsModule } from '@angular/forms';
import	{	NgxDatatableModule	}	from	'@swimlane/ngx-datatable';

const routes:Routes=[
  {path: '', component: LetterInfoComponent,}
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ],
  declarations: [LetterInfoComponent],
  providers:[HttpService]
})
export class LetterInfoModule { }
