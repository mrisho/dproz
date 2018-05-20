import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'dproz-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  verificationForm: FormGroup;
  email: string;

  constructor(private router: Router, private fb: FormBuilder, private service: AuthenticationService) { }

  ngOnInit() {
    this.email = window.atob(window.sessionStorage.getItem('encoded'));
    this.verificationForm = this.fb.group({
      code: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.verificationForm.valid) {
      this.service.verification(this.verificationForm.get('code').value).subscribe(() => {
        this.router.navigate(['../dproz/home']);    
      })
    }
  }

}
