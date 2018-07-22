import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/global-components/header/header.component';
import { AppRoute } from './app.routes';
import { DprozModule } from './dproz/dproz.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './shared/services/authentication.service';
import { StateService } from './shared/services/state.service';
import { PlacesService } from './shared/services/places.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthTokenInterceptor } from './shared/http-interceptors/auth-token-interceptor';
import { DprozContactUsComponent } from './dproz-contact-us/dproz-contact-us.component';
import { DprozAboutUsComponent } from './dproz-about-us/dproz-about-us.component';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DprozContactUsComponent,
    DprozAboutUsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    // Routing  
    AppRoute,
    DprozModule
  ],
  providers: [
    AuthenticationService,
    StateService,
    PlacesService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
