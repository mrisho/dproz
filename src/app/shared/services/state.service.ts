import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class StateService {

  intialState = {
    loggedIn: false,
    authToken: undefined,
    userReferenceId: undefined,
    identity: {
      emailAddress: undefined,
      address: undefined
    }
  }

  constructor() { }
  user = new BehaviorSubject(this.intialState);

  next(data) {
    this.user.next(data);
  }

  getAuthToken() {
    return window.localStorage.getItem('auth-session');
  }

  getState() {
    return {...this.user.value, authToken: null};
  }

  setIdentity(identity) {
    let currentValue = this.user.value;
    currentValue.identity = {...currentValue.identity, ...identity};
   
    this.next(currentValue);    
  }

  getCurrentUser(){
    return localStorage.getItem("user_details");
  }
  
  setReferenceId(referenceId) {
    let currentValue = this.user.value;
    currentValue.userReferenceId = referenceId;
    this.next(currentValue);    
  }

  resetState() {
    this.next(this.intialState);
  }
}
