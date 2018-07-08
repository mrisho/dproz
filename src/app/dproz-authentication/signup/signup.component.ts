import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StateService } from '../../shared/services/state.service';

import * as isEmail from 'isemail';

@Component({
  selector: 'dproz-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private service: AuthenticationService, private state: StateService) { }

  signupForm: FormGroup; 
  user: string;

  ngOnInit() {
    this.signupForm = this.fb.group({
      userType: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]], 
      lastName: ['',[ Validators.required, Validators.minLength(2)]], 
      middleName: '',
      emailAddress: ['', Validators.required], 
      password: ['',[ Validators.required, Validators.minLength(8)]], 
      repeatPassword: ['', Validators.required], 
      profilePictureUrl: '',
      lastChangedPasswordOn: null,
      verificationDate: null,
      verified: true,
      recaptcha:[null, Validators.required],
      phone: this.fb.group({
        phoneNumber: '1111222211',
        primary: true,
        contactMethod: 'CALL'
      }),
      address: this.fb.group({
        longitude: 0,
        latitude: 0,
        street: '',
        district: '',
        region: '',
        country: ''
      }),
    })
  }

  onSubmit() {
    if(this.signupForm.get('password').value  !== this.signupForm.get('repeatPassword').value) {
      this.signupForm.get('repeatPassword').setErrors({passMismatch: "password"})
    }
    if(!isEmail.validate(this.signupForm.get('emailAddress').value))
      this.signupForm.get('emailAddress').setErrors({invalidEmail: 'error'}) 

    if (this.signupForm.valid) {
      let form = this.signupForm.getRawValue();
      this.service.signup(form).subscribe(({userReferenceId}) => {
        window.sessionStorage.setItem('encoded', window.btoa(this.signupForm.get('emailAddress').value));
        this.state.setReferenceId(userReferenceId);
        this.state.setIdentity({emailId: form.emailAddress})
        this.router.navigate(['../dproz/authenticate']);
      }, error => {
        window.sessionStorage.setItem('encoded', window.btoa(this.signupForm.get('emailAddress').value));
        // this.router.navigate(['../dproz/authenticate']);
        console.log(error, `Error!!!!`)
      });
      
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  userType(e) {
    
    this.user = e.target.id;
    let status = e.target.checked;
    if (status)
      this.signupForm.get('userType').setValue(this.user);
    else 
      this.signupForm.get('userType').setValue('');
  }

  userTypeError() {
    this.signupForm.get('userType').errors
  }

  hasError(input, type?: string) {
    return (type ? this.signupForm.get(input).getError(type) : this.signupForm.get(input).errors)
            && this.signupForm.get(input).touched;
  }

}
