import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { log } from 'util';

@Component({
  selector: 'dproz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: AuthenticationService) { }

  ngOnInit() {
    let a = {
      "userReferenceId": "test",
      "userType": "comsumer",
      "firstName": "Va",
      "lastName": "Sh",
      "middleName": "middle",
      "phone": {
        "phoneNumber": "2223334567",
        "isPrimary": true,
        "contactMethod": "Mobile"
      },
      "address": {
        "longtude": 0,
        "latitude": 0,
        "street": "string",
        "district": "string",
        "region": "string",
        "country": "string"
      },
      "emailAddress": "string",
      "password": "string",
      "profilePictureUrl": "string"
    }

  }

}
