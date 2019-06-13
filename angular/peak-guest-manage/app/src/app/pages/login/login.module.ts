import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { CookieService,CookieModule } from 'ngx-cookie'
import { HttpService } from '../../shared/service/http-serve.service';


const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CookieModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent],
  providers: [CookieService,HttpService]
})
export class LoginModule { }
