import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'index', component: IndexComponent },
  // { path: 'form', component: FormComponent },
  // { path: 'select', component: SelectComponent },
  // {
  //   path: 'pages2', component: Pages02Component,
  //   children: [
  //     { path: 'nav01', component: Nav01Component },
  //     { path: 'nav02', component: Nav02Component },
  //     { path: 'nav03', component: Nav03Component },
  //   ],
  // },
  // { path: 'pages3', component: Pages03Component },
  // { path: 'pages4', component: Pages04Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
