import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/global-components/header/header.component';
import { AppRoute } from './app.routes';
import { DprozModule } from './dproz/dproz.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './shared/services/authentication.service';
import { StateService } from './shared/services/state.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
