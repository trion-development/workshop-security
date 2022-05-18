import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
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

  constructor(private authStore: AuthStoreService, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getLogedIn();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getLogedIn();
  }

  private getLogedIn(): Observable<boolean> {
    return this.authStore.getLoginState()
      .pipe(
        first(state => !state.loginPending),
        map(state => !!state.user),
        tap(loggedIn => {
          if (!loggedIn) {
            this.authService.authorizeUser();
          }
        })
      );
  }
}
