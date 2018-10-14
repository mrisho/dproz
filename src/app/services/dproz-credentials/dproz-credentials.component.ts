import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


export class Credential 
{
      Id : string;
      Name : string;
}

@Component({
  selector: 'dproz-credentials',
  templateUrl: './dproz-credentials.component.html',
  styleUrls: ['./dproz-credentials.component.scss']
})
export class DprozCredentialsComponent implements OnInit {

  editForm:boolean = false;
  credentialForm: FormGroup;
  credentials: Credential[];

  attachments: FormArray;
  constructor(private fb: FormBuilder) { 
    this.credentials = [
      {
        Id : "90", Name : "Bachelor Degree",
      },
      {
        Id : "91", Name : "Masters",
      },
      {
        Id : "92", Name : "PhD Holder",
      },
      {
        Id : "93", Name : "Professor",
      },

    ];

    this.credentialForm = fb.group({
     
        'credentialType': ['', Validators.required],
        'credentialDescription': ['', Validators.required],
        'startDate': ['', Validators.required],
        'endDate': ['', Validators.required],
   
     
        'CredentialId': ['', Validators.minLength(4)],
        'authorityName': [''],
      
     
      attachments: this.fb.array([this.createAttachment()])

    });

    this.attachments = this.credentialForm.get('attachments') as FormArray;


    this.attachments.removeAt(0);

  }

  createAttachment(file = null, url = null, caption = null): FormGroup {
    return this.fb.group({
      file: file,
      url: url,
      caption: caption
    });
  }

  ngOnInit() {
  }

  removeImage(img) {

    this.attachments = this.credentialForm.get('attachments') as FormArray;

    this.attachments.removeAt(img);

  }

  addPhoto(file, url, caption): void {

    this.attachments = this.credentialForm.get('attachments') as FormArray;


    this.attachments.push(this.createAttachment(file, url, caption));
  }

  onFileChanged(event) {

    console.log(event.target.files[0].name);

    if (event.target.files && event.target.files[0]) {

     // this.files.push(event.target.files[0]);
      let file = event.target.files[0];
      var reader = new FileReader();
      let caption = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        let url = event.target.result;

        this.addPhoto(file, url, caption)
      }
    }

  }

  addCredential() {
    this.editForm = true;
  }

  saveForm() {
    console.log(this.credentialForm.value);
    this.editForm = false;
  }

  editCredential() {
    this.editForm = true;
  }


}
// {
  //   "type": "CERTIFICATE_CREDENTIAL",
  //   "description": "string",
  //   "identificationNumber": "string",
  //   "issuedBy": "string",
  //   "effectiveDate": "string",
  //   "expiringDate": "string",
  //   "referenceId": "string",
  //   "attachment": {
  //     "referenceId": "string",
  //     "parentReferenceId": "string",
  //     "category": "PROJECT",
  //     "url": {
  //       "url": "string"
  //     },
  //     "thumbnail": true,
  //     "userReferenceId": "string",
  //     "description": "string",
  //     "createdDate": "string"
  //   }
  // }