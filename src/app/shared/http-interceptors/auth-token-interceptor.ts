import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private auth: StateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.auth.getAuthToken();
    console.log(authToken, req, '**************************************');
    

    const authReq = req.clone(
      authToken ? { headers: req.headers.set('Authorization', authToken) } : {});

    return next.handle(authReq);
  }
}