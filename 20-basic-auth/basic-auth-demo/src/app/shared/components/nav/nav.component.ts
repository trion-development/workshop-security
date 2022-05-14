import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserInfo } from '../../user-info/index';
import { UserInfo } from '../../user-info/user-info.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  userInfo?: Observable<UserInfo | undefined>;
  isMenuCollapsed = true;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.userInfo = this.store.select(selectUserInfo);
  }

  getValue() {
    console.log('cd');
    return '';
  }

}
