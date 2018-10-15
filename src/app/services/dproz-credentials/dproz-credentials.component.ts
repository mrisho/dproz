import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Attachment, UrlClass } from '../../shared/domain/common_data';
import { CredentialClass, CredentialType } from '../../shared/domain/credential';
import { CredentialsService } from '../../shared/services/credentials.service';




@Component({
  selector: 'dproz-credentials',
  templateUrl: './dproz-credentials.component.html',
  styleUrls: ['./dproz-credentials.component.scss']
})
export class DprozCredentialsComponent implements OnInit {

  editForm:boolean = false;
  credentialForm: FormGroup;
  credentials: CredentialType[];
  credentialData: CredentialClass[] = [];
  hasAttachment:boolean = false;

  attachments: FormArray;
  constructor(private fb: FormBuilder, private credentialService: CredentialsService) { 

    this.credentials = credentialService.getCredentiaTypes();

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
    this.hasAttachment = false;

  }

  addPhoto(file, url, caption): void {

    this.attachments = this.credentialForm.get('attachments') as FormArray;


    this.attachments.push(this.createAttachment(file, url, caption));
    this.hasAttachment = true;
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

        this.addPhoto(file, url, caption);
       
      }
    }

  }

  addCredential() {
    this.editForm = true;
  }

  getAttachments(): Attachment[] {

    let attachments: Attachment[] = [];

    this.attachments = this.credentialForm.get('attachments') as FormArray;

    for (let i = 0; i < this.attachments.controls.length; i++) {

      let attachmentForm = this.attachments.controls[i] as FormGroup;
      let file = attachmentForm.controls["file"].value;
      let url = attachmentForm.controls["url"].value;
      let caption = attachmentForm.controls["caption"].value;

      let attachment: Attachment = <Attachment>{
        referenceId: "",
        parentReferenceId: "",
        category: "CREDENTIAL",
        url: <UrlClass>{ url: url },
        thumbnail: true,
        userReferenceId: "",
        description: caption,
        createdDate: (new Date()).toDateString()
      };


      attachments.push(attachment);

    }
    return attachments;
  }

  getCurrentCredential(attachment: Attachment):CredentialClass
  {


    let credential = new CredentialClass();

    credential.type = this.credentialForm.get("credentialType").value;
    credential.description = this.credentialForm.get("credentialDescription").value;
    credential.identificationNumber = this.credentialForm.get("CredentialId").value;
    credential.referenceId = "";
    credential.issuedBy = this.credentialForm.get("authorityName").value;
    credential.effectiveDate = this.credentialForm.get("startDate").value;
    credential.expiringDate = this.credentialForm.get("endDate").value;
    
    credential.attachment = attachment;

    return credential;
  }

  saveForm() {
    
    let attachment:Attachment = this.getAttachments()[0];

    let credential:CredentialClass = this.getCurrentCredential(attachment);
    
    this.credentialData.push(credential);

    console.log(credential);

    this.credentialService
    .insertCredential(credential.getPostingData())
    .subscribe( x => {
        
        console.log(x);
    });

    this.editForm = false;
  }

  editCredential() {
    this.editForm = true;
  }


}
