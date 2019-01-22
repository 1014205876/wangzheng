import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { EchartComponent } from './echart/echart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'table', component: TableComponent },
      { path: 'echart', component: EchartComponent },
      // { path: 'model', component: ModelComponent },
      { path: 'model', loadChildren: './model/model.module#ModelModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }