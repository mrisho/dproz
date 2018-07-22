import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../shared/services/authentication.service';
import { StateService } from '../../shared/services/state.service';

@Component({
  selector: 'dproz-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  verificationForm: FormGroup;
  resendTokenForm: FormGroup;
  email: string;
  token: string;
  message: string;
  errorMessage: string;
  activeForm: string;
  pageIntent: string;
  
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private service: AuthenticationService, private state: StateService) { }
  
  ngOnInit() {
    console.log(this.route.params, 'params');
    this.route.params.subscribe(data => {
      if (data.code) {
        this.service.verification(this.verificationForm.get('code').value).subscribe(() => {
          this.router.navigate(['../dproz/login']);
        }, (error) => {
          this.errorMessage = `There was an error while verifing you account. Please try again.`
          console.log(error, 'Error while verification');
        })
      } else if (this.state.getState().userReferenceId && this.state.getState().identity.emailAddress) {
        this.pageIntent = `Verify Account`
        this.activeForm = 'verificationForm';
        this.token = this.state.getState().userReferenceId;
        this.email = this.state.getState().identity.emailAddress;
      } else {
        this.pageIntent = `Resend Token`
        this.activeForm = 'resendTokenForm';
        this.message = `Please resend token and follow the link`
      }
    })

    this.verificationForm = this.fb.group({
      code: ['', Validators.required]
    })

    this.resendTokenForm = this.fb.group({
      emailId: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.activeForm==='verificationForm') {
      if(this.verificationForm.valid) {
        this.service.verification(`${this.verificationForm.get('code').value}:${this.token}`).subscribe(() => {
          this.router.navigate(['../dproz/home']); 
        },(error) => {
          console.log(error, `Error while `);
        })
      }
    } else if (this.activeForm==='resendTokenForm') {
      if(this.resendTokenForm.valid) {
        this.service.resendToken(this.resendTokenForm.get('emailId').value).subscribe(() => {
          this.router.navigate(['../dproz/home']);    
        },(error) => {
          console.log(error, ``);
        })
      }
    }

  }

}
