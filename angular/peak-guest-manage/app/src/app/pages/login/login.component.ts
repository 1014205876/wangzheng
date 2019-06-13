import { Routes, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { FormsModule } from '@angular/forms';

import { HttpService } from '../../shared/service/http-serve.service';
import { of } from 'rxjs/observable/of';
import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http/src/http';

import { User } from '../user';
import { post } from 'selenium-webdriver/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user = new User("", "");
  public remebPsw = true;
  public authorizationService: string;

  public mask=false;

  constructor(private http: HttpService, private cookie: CookieService, private router: Router) {
    
  }
  //时候记住密码
  remebPswFun() {
    this.remebPsw=!this.remebPsw;
  }


  ngOnInit() {
  }

  onSubmit(value) {
    this.mask=false;
    value.rememberMe=true;
    this.http.login("/auth/login", value)
    .subscribe(res=>{
      this.authorizationService = res.result.type + " " + res.result.token;
      this.cookie.put("Template1", this.authorizationService, { expires: new Date(new Date().getTime() + 2505600000) });
      this.router.navigate(['/app/home']);
    },error=>{
      this.mask=true;
    });
    if (this.remebPsw) {
      this.cookie.putObject("remebPsw", value, { expires: new Date(new Date().getTime() + 7516800000) });
    } else {
      this.cookie.remove("remebPsw");
    }
  }

}
