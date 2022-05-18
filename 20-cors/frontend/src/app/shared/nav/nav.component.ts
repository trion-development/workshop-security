import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../core/store.service';
import { User } from '../../core/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  userInfo?: Observable<User | undefined>;
  isMenuCollapsed = true;

  constructor(private readonly authStore: StoreService) {
  }

  ngOnInit(): void {
    this.userInfo = this.authStore.getUser();
  }

  logout(): void {

  }
}
