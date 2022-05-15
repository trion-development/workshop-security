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
    return this.authStore.getToken()
      .pipe(
        first(),
        exhaustMap(token => {
          let headers = new HttpHeaders();
          if (token) {
            headers = headers.set('Authorization', 'token ' + token);
          }
          const req = request.clone({headers});
          return next.handle(req);
        })
      );
  }
}
