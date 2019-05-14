import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//ngif，ngfor等
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { HttpClientModule } from '@angular/common/http';//http
import { Routes, RouterModule } from '@angular/router';//路由

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: './index/index.module#IndexModule' },
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [
  ]
})
export class PagesModule { }
