import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  private state = new BehaviorSubject<{
    user?: User;
    accessToken?: string;
  }>({});

  constructor() {
  }

  storeToken(access_token: string) {
    this.state.next({accessToken: access_token});
  }

  logout(): void {
    this.state.next({});
  }

  userLoaded(user: User) {
    this.state.next({...this.state.value, user});
  }

  getLoginState(): Observable<{ loginPending: boolean, user?: User }> {
    return this.state.asObservable()
      .pipe(
        map(state => ({
          loginPending: !!state.accessToken && !state.user,
          user: state.user
        }))
      );
  }

  getToken(): Observable<string | undefined> {
    return this.state.pipe(map(state => state.accessToken));
  }

  getUser(): Observable<User | undefined> {
    return this.state.pipe(map(state => state.user));
  }
}
