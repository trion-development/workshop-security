import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import langDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from './shared/components/modal/modal.module';
import { NavComponent } from './shared/components/nav/nav.component';
import { SeatsEffects } from './shared/seats/seats.effects';
import * as fromRoot from './shared/user-info/index';
import { UserInfoEffects } from './shared/user-info/user-info.effects';
import { RouterModule } from '@angular/router';

registerLocaleData(langDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot(fromRoot.reducers, {}),
    environment.production ? [] : StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([UserInfoEffects, SeatsEffects]),

    AppRoutingModule,
    RouterModule,

    ModalModule,
    NgbCollapseModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
