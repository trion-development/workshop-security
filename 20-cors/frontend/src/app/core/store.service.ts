import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  storeCredentials(username: string, password: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
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

  getUser(): User | undefined {
    try {
      return JSON.parse(localStorage.getItem('user') || '');
    } catch (e) {
      return undefined;
    }
  }

  clear(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
