import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './theme/home/home.module#HomeModule'
      },
      {
        path: 'application',
        loadChildren: './theme/application/application.module#ApplicationModule'
      },
      {
        path: 'configure',
        loadChildren: './theme/configure/configure.module#ConfigureModule'
      },
      {
        path: 'role',
        loadChildren: './theme/role/role.module#RoleModule'
      },
      {
        path: 'organization',
        loadChildren: './theme/organization/organization.module#OrganizationModule'
      },
      {
        path: 'baseResource',
        loadChildren: './theme/base-resource/base-resource.module#BaseResourceModule'
      },
      {
        path: 'businessResource',
        loadChildren: './theme/business-resource/business-resource.module#BusinessResourceModule'
      },
      {
        path: 'log',
        loadChildren: './theme/log/log.module#LogModule'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
