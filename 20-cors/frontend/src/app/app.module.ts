import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import langDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fromRoot from './core/index';
import { SeatsEffects } from './core/seats/seats.effects';
import { HomeComponent } from './features/home/home.component';
import { ModalModule } from './shared/components/modal/modal.module';
import { NavComponent } from './shared/components/nav/nav.component';

registerLocaleData(langDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot(fromRoot.reducers, {}),
    environment.production ? [] : StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([SeatsEffects]),

    AppRoutingModule,
    RouterModule,

    ModalModule,
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
