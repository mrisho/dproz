import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(signupInputs) {
    return this.http.post<any>('/api/users', signupInputs);
  }

  verification(token) {
    return this.http.get<void>(`/api/users/verification/${token}`);
  }
  
  login(credentials) {
    return this.http.post('/api/users/login', credentials);
  }

  forgotPassword(emailId) {
    let options = { params: new HttpParams().set('emailAddress', emailId) };
    return this.http.get('/api/users/forgot-password', options);
  }



}

