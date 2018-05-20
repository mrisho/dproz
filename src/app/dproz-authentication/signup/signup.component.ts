import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import * as isEmail from 'isemail';
@Component({
  selector: 'dproz-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private service: AuthenticationService) { }

  signupForm: FormGroup; 
  user: string;

  ngOnInit() {
    this.signupForm = this.fb.group({
     firstName: ['', [Validators.required, Validators.minLength(2)]], 
     lastName: ['',[ Validators.required, Validators.minLength(2)]], 
     emailAddress: ['', Validators.required], 
     password: ['',[ Validators.required, Validators.minLength(8)]], 
     repeatPassword: ['', Validators.required], 
     userType: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.signupForm.get('password').value  !== this.signupForm.get('repeatPassword').value) {
      this.signupForm.get('repeatPassword').setErrors({passMismatch: "password"})
    }
    if(!isEmail.validate(this.signupForm.get('emailAddress').value))
      this.signupForm.get('emailAddress').setErrors({invalidEmail: 'error'}) 

    if (this.signupForm.valid){
      this.service.signup(this.signupForm.getRawValue()).subscribe((data) => {
        window.sessionStorage.setItem('encoded', window.btoa(this.signupForm.get('emailAddress').value));
        this.router.navigate(['../dproz/authenticate']);
      });
      
    }
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
