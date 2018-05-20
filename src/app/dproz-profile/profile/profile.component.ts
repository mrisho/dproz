import { Component, OnInit } from '@angular/core';
import { StateService } from '../../shared/services/state.service';

@Component({
  selector: 'dproz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.user.subscribe(user => this.user = user)
  }

}
