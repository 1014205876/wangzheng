import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//ngif，ngfor等
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { HttpClientModule } from '@angular/common/http';//http
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: './index/index.module#IndexModule' },
      { path: 'form', loadChildren: './form/form.module#FormModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class PagesModule { }
