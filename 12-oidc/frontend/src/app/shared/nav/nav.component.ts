import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  userInfo?: Observable<{ preferred_username: string } | null>;
  isMenuCollapsed = true;

  constructor(private readonly oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit(): void {
    this.userInfo = this.oidcSecurityService.userData$
      .pipe(map(data => data.userData));
  }

  logout(): void {
    this.oidcSecurityService.logoffAndRevokeTokens()
      .subscribe();
  }
}
