import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private oidcSecurity: OidcSecurityService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getLogedIn(state.url.replace('/',''));
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getLogedIn(segments.join('/'));
  }

  private getLogedIn(url: string): Observable<boolean> {
    return this.oidcSecurity.checkAuth()
      .pipe(
        map(({isAuthenticated}) => {
          if (isAuthenticated) {
            return true;
          }
          this.oidcSecurity.authorize();
          return false;
        }));
  }
}
