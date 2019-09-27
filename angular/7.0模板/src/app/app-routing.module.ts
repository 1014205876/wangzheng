import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入页面
import { AdminComponent } from './layout/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { UploadComponent } from './pages/upload/upload.component';
import { UserCenterComponent } from './pages/user-center/user-center.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'module/form', component: FormComponent },
            { path: 'module/upload', component: UploadComponent },
            { path: 'user-center', component: UserCenterComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
