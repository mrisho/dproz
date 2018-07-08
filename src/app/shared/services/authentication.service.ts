import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DOMAIN } from '../constants/constants';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(signupInputs) {
    return this.http.post<any>(`${DOMAIN}/api/dproz/users`, signupInputs);
  }

  verification(token) {
    return this.http.get<void>(`${DOMAIN}/api/dproz/users/verification/${token}`);
  }

  resendToken(emailId) {
    const options = { params: new HttpParams().set('emailAddress', emailId) };
    return this.http.get<void>(`${DOMAIN}/api/dproz/users/verification/resend`, options);
  }
  
  login(credentials) {
    return this.http.post(`${DOMAIN}/api/dproz/login`, credentials);
  }

  forgotPassword(emailId) {
    return this.http.post(`${DOMAIN}/api/dproz/users/forgot-password`, emailId);
  }

  changePassword(data) {
    return this.http.put(`${DOMAIN}/api/users/change-password`, data);
  }

  getUser(userReference) {
    console.log(`${DOMAIN}/api/dproz/users/${userReference}`, 'test');
    return this.http.get<any>(`${DOMAIN}/api/dproz/users/${userReference}`);
  }

}

