import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';

@Injectable()
export class HasLoginGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private route: Router
  ) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.auth.getAuthorization("Template"))
    if (this.auth.getAuthorization("Template")) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}
