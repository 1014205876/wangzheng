import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入页面
import { HomeComponent } from './pages/home/home.component';
import { EchartComponent } from './pages/echart/echart.component';
import { FormComponent } from './pages/form/form.component';
import { ThreeComponent } from './pages/three/three.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },//默认首页
  { path: 'home', component: HomeComponent },//首页
  { path: 'module/echart', component: EchartComponent },//规则分组
  { path: 'module/form', component: FormComponent },//规则管理
  { path: 'three', component: ThreeComponent },//规则管理
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
