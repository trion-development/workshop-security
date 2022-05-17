import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, tap } from 'rxjs';
import { ModalService } from '../../shared/modal/modal.service';
import { User } from '../user';
import { AuthStoreService } from './auth-store.service';

interface AuthResponse {
  access_token: string;
  scope: string;
  token_type: 'bearer';
}

export function authInit(auth: AuthService): () => Observable<unknown> {
  return () => auth.testForLoginCode();
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private authStore: AuthStoreService,
              private modalService: ModalService,
              private http: HttpClient) {
  }

  testForLoginCode(): Observable<AuthResponse> {
    const queryparams = this.router.parseUrl(location.search).queryParamMap;
    if (queryparams.get('code') && queryparams.get('state') === sessionStorage.getItem('auth_state')) {
      const params = new HttpParams({
        fromObject: {
          client_id: 'b0e2395a64874d9ca108',
          client_secret: 'bcce8e12e3eb2b053503f094b147077b8f91b98f',
          code: queryparams.get('code') ?? ''
        }
      });
      return this.http.post<AuthResponse>('/token', {}, {params, headers: {Accept: 'application/json'}})
        .pipe(
          tap(auth => {
            this.authStore.storeToken(auth.access_token);
            this.getUserData();
          })
        );
    }
    return EMPTY;
  }

  logout() {
    this.authStore.clear();
    this.router.navigateByUrl('/');
  }

  getUserData(): void {
    this.http.get<User>('https://api.github.com/user')
      .subscribe({
        next: user => this.authStore.userLoaded(user),
        error: err => {
          this.modalService.openErrorModal(err.message);
          this.authStore.clear();
        }
      });
  }

  authorizeUser(redirectPath?: string): void {
    const randomString = Math.random().toFixed(42);
    sessionStorage.setItem('auth_state', randomString);
    window.location.href = 'https://github.com/login/oauth/authorize' +
      '?client_id=b0e2395a64874d9ca108' +
      '&redirect_uri=http://localhost:4200/' + (redirectPath ?? '') +
      '&state=' + randomString;
  }
}
