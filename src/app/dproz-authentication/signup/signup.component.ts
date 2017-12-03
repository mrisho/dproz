import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'dproz-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }

  signupForm: FormGroup; 

  ngOnInit() {
    this.signupForm = this.fb.group({
     firstName: ['', Validators.required], 
     lastName: ['', Validators.required], 
     email: ['', Validators.required], 
     password: ['', Validators.required], 
     repeatPassword: ['', Validators.required], 
     service: ['', Validators.required]
    })
  }  

  onSubmit() {

    this.router.navigate(['../dproz/authenticate']);
    
  }

}
