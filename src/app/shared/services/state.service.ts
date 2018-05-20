import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class StateService {

  intialState = {
    loggedIn: false
  }

  constructor() { }
  user = new BehaviorSubject(this.intialState);

  next(data) {
    this.user.next(data);
  }
}
