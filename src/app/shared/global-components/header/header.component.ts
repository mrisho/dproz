import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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

  @ViewChild('myTopnav') topnav:ElementRef;

  userData;
  isMenuOpen:boolean;

  changeMenu(status){
    this.isMenuOpen = status;
  }
  ddClick(event:Event){

    event.stopImmediatePropagation();
  }

  dcClick(event:Event){

    let myTopnav: HTMLElement = document.getElementById('myTopnav') as HTMLElement;
    
    myTopnav.click();
    
  }


  constructor(private state: StateService, private router: Router, private r:Renderer2) { }

  ngOnInit() {    
    this.state.user.subscribe(data => {
      this.userData = data;  
    })
  }

  logout() {
    this.state.resetState();
    window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('user-reference');
    this.router.navigate(['../dproz/home']);
  }
}