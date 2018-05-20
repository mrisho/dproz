import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DprozMainComponent } from './dproz/dproz-main/dproz-main.component';
import { HomeComponent } from './dproz-home/home/home.component';
import { LoginComponent } from './dproz-authentication/login/login.component';
import { VerificationComponent } from './dproz-authentication/verification/verification.component';
import { SignupComponent } from './dproz-authentication/signup/signup.component';
import { ProfileComponent } from './dproz-profile/profile/profile.component';
import { PasswordResetComponent } from './dproz-authentication/password-reset/password-reset.component';
import { LoggedInGuard } from './shared/gaurds/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dproz',
    pathMatch: 'full'
  },
  {
    path: 'dproz',
    component: DprozMainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'authenticate', component: VerificationComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
      { path: 'password', component: PasswordResetComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: true
      }
    )
  ],
  exports: [ RouterModule ],
  providers: [LoggedInGuard]
})

export class AppRoute {}



