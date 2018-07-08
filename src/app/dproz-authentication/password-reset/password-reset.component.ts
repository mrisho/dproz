import { Component, OnInit } from '@angular/core';
import * as isEmail from 'isemail';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StateService } from '../../shared/services/state.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'dproz-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  isLoggedIn: boolean;
  forgotPasswordForm: FormGroup;
  changePasswordForm: FormGroup;
  activeForm = 'changePasswordForm';
  emailId;
  error;
  resetPassword;

  constructor(private service: AuthenticationService, private router: Router, private fb: FormBuilder, private state: StateService) { }

  ngOnInit() {
    this.isLoggedIn =  this.state.getState().loggedIn;
      this.changePasswordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        emailAddress: ['', Validators.required]
      })
    if (this.isLoggedIn) {
      this.activeForm = 'changePasswordForm';
      this.changePasswordForm.get('emailAddress').setValue(this.state.getState().identity.emailId);
    } else {
      this.activeForm = 'forgotPasswordForm';
    }

    
    this.forgotPasswordForm = this.fb.group({
      emailId: ['', Validators.required]
    })

  }

  email(e) {
    this.error = false;
    this.emailId = e.target.value;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      if (isEmail.validate(this.forgotPasswordForm.getRawValue().emailId)) {
        this.service.forgotPassword(this.forgotPasswordForm.getRawValue()).subscribe(() => {
          this.router.navigate(['../dproz/home']);
        }, (error) => {
          console.log(error, `Error while resetting password`);
        })
      } else {
        this.error = true;
      }
    } else if (this.changePasswordForm.valid) {
      this.service.changePassword(this.changePasswordForm.getRawValue()).subscribe(() => {
        this.router.navigate(['../dproz/home']);
      }, (error) => {
        console.log(error, `Error while resetting password`);
      })
    }

  }

}
