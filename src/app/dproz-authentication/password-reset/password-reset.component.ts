import { Component, OnInit } from '@angular/core';
import * as isEmail from 'isemail';
import { AuthenticationService } from '../../shared/services/authentication.service';
@Component({
  selector: 'dproz-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  emailId;
  error;
  resetPassword;

  constructor(private service: AuthenticationService) { }

  ngOnInit() {
  }

  email(e) {
    this.error = false;
    this.emailId = e.target.value;
  }

  onSubmit() {
    if (isEmail.validate(this.emailId)) {
      this.service.forgotPassword(this.emailId).subscribe(() => {
        this.resetPassword = true;
      })
    } else {
      this.error = true;
    }

  }

}
