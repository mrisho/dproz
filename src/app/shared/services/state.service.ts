import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class StateService {

  intialState = {
    loggedIn: false,
    authToken: undefined,
    userReferenceId: undefined,
    identity: {
      emailId: undefined
    }
  }

  constructor() { }
  user = new BehaviorSubject(this.intialState);

  next(data) {
    this.user.next(data);
  }

  getAuthToken() {
    return this.user.value.authToken;
  }

  getState() {
    return {...this.user.value, authToken: null};
  }

  setIdentity(identity) {
    let currentValue = this.user.value;
    currentValue.identity = {...currentValue.identity, ...identity};
    this.next(currentValue);    
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
