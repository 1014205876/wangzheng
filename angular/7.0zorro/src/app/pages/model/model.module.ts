import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ModelComponent } from './model.component';
import { OneComponent } from './one/one.component'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ModelComponent },
  { path: 'one', component: OneComponent },
];

@NgModule({
  declarations: [
    ModelComponent,
    OneComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ],
})
export class ModelModule { }
