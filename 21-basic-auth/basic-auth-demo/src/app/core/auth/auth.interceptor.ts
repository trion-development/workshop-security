import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthStoreService } from './auth-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authStore: AuthStoreService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authStore.getCredentials()
      .pipe(
        first(),
        exhaustMap(cred => {
          let headers = request.headers;
          if (cred.password && cred.username) {
            headers = headers.set('Authorization', `Basic ${btoa(cred.username + ':' + cred.password)}`);
          }
          const req = request.clone({headers});
          return next.handle(req);
        })
      );
  }
}
