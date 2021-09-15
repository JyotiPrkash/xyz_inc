import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private global: GlobalService, private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.global.isUserLoggedIn) {
      this.router.navigate(['../home']);
    }
    return this.global.isUserLoggedIn;
  }

}
