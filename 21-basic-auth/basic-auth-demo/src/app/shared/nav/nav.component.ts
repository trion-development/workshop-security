import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStoreService } from '../../core/auth/auth-store.service';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  userInfo?: Observable<User | undefined>;
  isMenuCollapsed = true;

  constructor(private readonly authService: AuthService,
              private readonly authStore: AuthStoreService) {
  }

  ngOnInit(): void {
    this.userInfo = this.authStore.getUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
