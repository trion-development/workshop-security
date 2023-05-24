import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authStore: AuthStoreService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.getLoggedIn();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.getLoggedIn();
  }

  private getLoggedIn(): boolean | UrlTree {
    const state = this.authStore.getLoginState();
    if (!state.user) {
      return this.router.parseUrl('/login');
    }
    return true;
  }
}
