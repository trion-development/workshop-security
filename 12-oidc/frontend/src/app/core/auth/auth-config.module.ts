import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'http://localhost:9090/realms/app/.well-known/openid-configuration',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'app-client',
      scope: 'openid profile', // 'openid profile offline_access ' + your scopes
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      unauthorizedRoute: '/',
      renewTimeBeforeTokenExpiresInSeconds: 30,
      secureRoutes: ['http://localhost:8080/api/trainings'],
      logLevel: LogLevel.Error
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule {
}
