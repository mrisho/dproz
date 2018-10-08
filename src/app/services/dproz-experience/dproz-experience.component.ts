import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';


export class MyFile
{
    url:string;
    caption:string;
}


@Component({
  selector: 'dproz-experience',
  templateUrl: './dproz-experience.component.html',
  styleUrls: ['./dproz-experience.component.scss']
})
export class DprozExperienceComponent implements OnInit {

  experienceForm : FormGroup;
  hide = true;
  editForm:boolean = false;
  token = "mrisho";
  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png",
    maxSize: "3",
    uploadAPI:  {
      url:"https://example-file-upload-api",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
     "Authorization" : `Bearer ${this.token}`
      }
    },
    theme: "dragAndDrop",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false
};



public files: UploadFile[] = [];
public urls:MyFile[] = [];



 
  removeImage(img)
  {
    const i = this.urls.indexOf(img);
    if(i != -1)
    {
      this.urls.splice(i, 1);
      this.files.splice(i, 1);
    }
    console.log(img);
    this.urls
  }
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  
  constructor(private fb: FormBuilder) { 

    this.experienceForm = fb.group({
      'projectDetails' : fb.group({
        'projectName' : ['', Validators.required],
        'projectDescription' : ['', Validators.required],
        'startDate' : ['', Validators.required],
        'endDate' : ['', Validators.required],
      }),
      'clientDetails': fb.group({
        'customerNames' : ['', Validators.required],
        'phoneNumber' : ['', Validators.required],
        'emailAddress' : ['', Validators.required],
        'allowContact' : ['', Validators.required],
      }),
     
    });

   

    //console.log(this.experienceForm.value());

  }

  onFileChanged(event)
  {

    console.log(event.target.files[0].name);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let caption = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let url = event.target.result;
        let u = new MyFile();
        u.url = url;
        u.caption = caption;
        this.urls.push(u);
      }
    }
  
  }

  addExperience()
  {
    this.editForm = true;
  }

  saveForm()
  {
    this.editForm = false;
  }

  editExperience()
  {
    this.editForm = true;
  }

  ngOnInit() {
  }

}
