import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StateService } from '../services/state.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private stateService: StateService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.stateService.user.value.loggedIn;
  }
}
