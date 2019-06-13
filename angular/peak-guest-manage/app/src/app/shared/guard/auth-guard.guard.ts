import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private auth:AuthService,private route:Router){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.getAuthorization("Template1")){
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}
