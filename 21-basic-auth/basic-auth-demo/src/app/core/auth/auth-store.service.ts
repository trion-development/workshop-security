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
    username?: string;
    password?: string;
  }>({});

  constructor() {
  }

  storeCredentials(username: string, password:string) {
    this.state.next({username, password});
  }

  storeUser(user: User) {
    this.state.next({...this.state.value, user});
  }

  getLoginState(): Observable<{ loginPending: boolean, user?: User }> {
    return this.state.asObservable()
      .pipe(
        map(state => ({
          loginPending: !!state.username && !! state.password && !state.user,
          user: state.user
        }))
      );
  }

  getCredentials(): Observable<{ username?: string; password?: string }> {
    return this.state.pipe(map(({user, ...credentials}) => credentials));
  }

  getUser(): Observable<User | undefined> {
    return this.state.pipe(map(state => state.user));
  }

  clear() {
    this.state.next({});
  }
}
