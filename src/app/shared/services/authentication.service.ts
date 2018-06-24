import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DOMAIN } from '../constants/constants';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(signupInputs) {
    return this.http.post<any>(`${DOMAIN}/api/users`, signupInputs);
  }

  verification(token) {
    return this.http.get<void>(`${DOMAIN}/api/users/verification/${token}`);
  }
  
  login(credentials) {
    return this.http.post(`${DOMAIN}/api/dproz/login`, credentials);
  }

  forgotPassword(emailId) {
    let options = { params: new HttpParams().set('emailAddress', emailId) };
    return this.http.get(`${DOMAIN}/api/users/forgot-password`, options);
  }

  getUser(userReference) {
    return this.http.get<any>(`${DOMAIN}/api/dproz/users/${userReference}`);
  }


}

