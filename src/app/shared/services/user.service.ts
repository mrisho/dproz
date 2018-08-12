import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SERVICING_DOMAIN } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  updateprofile(referenceId, profile) {
    return this.http.put<any>(`${SERVICING_DOMAIN}/api/dproz/users/${referenceId}`, profile);
  }
}
