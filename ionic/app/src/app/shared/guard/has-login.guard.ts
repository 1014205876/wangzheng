import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class HasLoginGuard implements CanActivate {
    constructor(private route: Router) { }
    canActivate() {
        if (localStorage.getItem('token')) {
            return true
        }
        this.route.navigate(['/popularize-register'])
        return false
    }
}
