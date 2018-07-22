import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'dproz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig] 

})
export class HeaderComponent implements OnInit {

  userData;

  constructor(private state: StateService, private router: Router) { }

  ngOnInit() {    
    this.state.user.subscribe(data => {
      this.userData = data;  
    })
  }

  logout() {
    this.state.resetState();
    window.localStorage.removeItem('auth-session');
    window.localStorage.removeItem('user-reference');
    this.router.navigate(['../dproz/home']);
  }
}
