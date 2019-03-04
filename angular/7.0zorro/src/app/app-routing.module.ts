import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入页面
import { HomeComponent } from './pages/home/home.component';
import { EchartComponent } from './pages/echart/echart.component';
import { ModelComponent } from './pages/model/model.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'echart',
        component: EchartComponent,
    },
    {
        path: 'model',
        component: ModelComponent,
    },
    {
        path: 'table',
        component: TableComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }