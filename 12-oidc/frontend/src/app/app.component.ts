import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'trainings';

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth()
      .subscribe(({isAuthenticated, userData, accessToken, idToken}) => {
        if (!isAuthenticated) {
          return;
        }
        console.log('Logged in.');
        console.log(userData);
      });
  }

}
