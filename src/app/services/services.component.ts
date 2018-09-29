import { Inject, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dproz-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
 
})
export class ServicesComponent implements OnInit {

  ngOnInit(): void {
  //  throw new Error("Method not implemented.");
  }

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      width: '1000px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }
}

@Component({
  selector: 'edit-service',
  templateUrl: './edit-service-dialog.html',
})

export class EditServiceComponent {

  constructor(
    public dialogRef: MatDialogRef<EditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(localStorage);
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
