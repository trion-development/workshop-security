import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from './user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>('/assets/api/user.json');
  }
}
