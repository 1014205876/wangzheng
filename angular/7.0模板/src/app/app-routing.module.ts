import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入页面
import { HomeComponent } from './pages/home/home.component';
import { EchartComponent } from './pages/echart/echart.component';
import { FormComponent } from './pages/form/form.component';
// import { ThreeComponent } from './pages/three/three.component';
import { SwiperComponent } from './pages/swiper/swiper.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'module/echart', component: EchartComponent },
  { path: 'module/form', component: FormComponent },
//   { path: 'three', component: ThreeComponent },
  { path: 'swiper', component: SwiperComponent },
  { path: 'module/upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
