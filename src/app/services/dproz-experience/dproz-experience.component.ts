import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';


export class MyFile
{
    url:string;
    caption:string;
    file;
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
  photos: FormArray;

 


public files = [];
public urls:MyFile[] = [];



 
  removeImage(img)
  {

    this.photos = this.experienceForm.get('photos') as FormArray;
      
    this.photos.removeAt(img);

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
      photos : this.fb.array([ this.createPhoto() ])
     
    });

    this.photos = this.experienceForm.get('photos') as FormArray;
      
    
          this.photos.removeAt(0);
      

  }

    createPhoto(file = null, url = null, caption = null): FormGroup {
      return this.fb.group({
        file: file,
        url: url,
        caption: caption
      });
    }

    addPhoto(file, url, caption): void {

      this.photos = this.experienceForm.get('photos') as FormArray;
   
      
      this.photos.push(this.createPhoto(file, url, caption));
    }

  onFileChanged(event)
  {

    console.log(event.target.files[0].name);

    if (event.target.files && event.target.files[0]) {

      this.files.push(event.target.files[0]);
      let file = event.target.files[0];
      var reader = new FileReader();
      let caption = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let url = event.target.result;
        let u = new MyFile();
        u.url = url;
        u.caption = caption;
        u.file = file;
        this.urls.push(u);

        this.addPhoto(file, url, caption)
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
