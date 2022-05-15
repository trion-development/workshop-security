import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthStoreService } from './auth-store.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authStore: AuthStoreService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.getLogedIn();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.getLogedIn();
  }

  private getLogedIn(): Observable<boolean | UrlTree> {
    return this.authStore.getLoginState()
      .pipe(
        first(state => !state.loginPending),
        map(state => {
          if (!state.user) {
            return this.router.parseUrl('/login')
          }
          return true;
        })
      );
  }
}