import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../user';
import { AuthStoreService } from './auth-store.service';

interface AuthResponse {
  access_token: string;
  scope: string;
  token_type: 'bearer';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authStore: AuthStoreService,
              private router: Router,
              private http: HttpClient) {
  }

  login(credentials: { username: string, password: string }): Observable<User> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      })
    };
    this.authStore.storeCredentials(credentials.username, credentials.password);
    return this.http.get<User>(`${environment.api}/userinfo`, httpOptions)
      .pipe(
        tap({
          next: user => {
            this.authStore.storeUser(user);
            this.router.navigateByUrl('/');
          },
          error: err => this.authStore.clear()
        })
      );
  }

  logout(): void {
    this.authStore.clear();
    this.router.navigateByUrl('/');
  }
}
