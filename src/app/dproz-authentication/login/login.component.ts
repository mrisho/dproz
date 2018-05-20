import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StateService } from '../../shared/services/state.service';

@Component({
  selector: 'dproz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorResponse: Response;

  constructor(private fb: FormBuilder, private router: Router, private service: AuthenticationService,private state: StateService) { }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],      
    })
  }

  onSubmit() {
    this.service.login(this.loginForm.getRawValue()).subscribe((data) => {
      this.errorResponse = null;
      this.state.next({loggedIn: true ,...data});
      this.router.navigate(['../dproz/home']);
    }, (error) => {
      this.errorResponse = error;
    })
  }

}
