import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  private user = new BehaviorSubject<User | undefined>(undefined);

  storeCredentials(username: string, password: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  getLoginState(): { loginPending: boolean, user?: User } {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user') || '');
    } catch (e) {
    }
    return {
      loginPending: !!username && !!password && !user,
      user
    };
  }

  getCredentials(): { username?: string; password?: string } {
    return {
      username: localStorage.getItem('username') ?? undefined,
      password: localStorage.getItem('password') ?? undefined
    };
  }

  getUser(): Observable<User | undefined> {
    if (!this.user.value) {
      let user: User | undefined;
      try {
        user = JSON.parse(localStorage.getItem('user') || '');
        this.user.next(user);
      } catch (e) {
      }
    }
    return this.user.asObservable();
  }

  clear(): void {
    this.user.next(undefined);
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
