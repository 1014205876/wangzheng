import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  // { path: 'model', loadChildren: './pages/model/model.module#ModelModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }