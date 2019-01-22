import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

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
    NgZorroAntdModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
})
export class ModelModule { }
