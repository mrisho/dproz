import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StateService } from '../../shared/services/state.service';
import { Auth } from '../../shared/interfaces/auth';

@Component({
  selector: 'dproz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorResponse: Response;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private service: AuthenticationService,
              private state: StateService) { }
  // Dproz@123
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['vsharma226@gmail.com', Validators.required],
      password: ['Dproz@123', Validators.required],      
    })
  }

  onSubmit() {
    this.service.login(this.loginForm.getRawValue()).subscribe(({ Authorization, userReferenceId } : Auth) => {
      this.errorResponse = null;
      this.state.next({loggedIn: true, authToken: Authorization, userReferenceId});
      this.service.getUser(this.state.getState().userReferenceId).subscribe(data => {
        this.state.setIdentity(data);
        this.router.navigate(['../dproz/home']);
      });

    }, (error) => {
      this.errorResponse = error;
    })
  }

}
