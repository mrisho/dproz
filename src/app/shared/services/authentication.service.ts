import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup() {
    this.http.post('', {});
  }

  verification() {
    this.http.post('', {});
  }
  
  login() {
    this.http.post('', {});
  }

}

