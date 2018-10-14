import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICING_DOMAIN } from '../constants/constants';
import { StateService } from './state.service';

export class CredentialClass {


}

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor(private http: HttpClient, private state: StateService) { }


  insertCredential(credentialData) {

    let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.put<any>(`${SERVICING_DOMAIN}/api/dproz/pros/${proReferenceId}/credentials`, credentialData);
  }

  updateCredential(credentialData) {

    let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.put<any>(`${SERVICING_DOMAIN}/api/dproz/pros/${proReferenceId}/credentials`, credentialData);

  }

  deleteteCredential(credentialReferenceId) {

    let proReferenceId = JSON.parse(this.state.getCurrentUser()).userReferenceId;

    return this.http.delete<any>(`${SERVICING_DOMAIN}/api/dproz/pros/{proReferenceId}/credentials/{credentialReferenceId}`);


  }




}
