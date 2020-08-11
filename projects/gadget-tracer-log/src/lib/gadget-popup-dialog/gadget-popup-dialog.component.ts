import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'gadget-popup-dialog',
  templateUrl: './gadget-popup-dialog.component.html',
  styleUrls: ['./gadget-popup-dialog.component.scss']
})
export class GadgetPopupDialogComponent implements OnInit {

  isSuccess: boolean = true;
  messageDisplay: string;
  constructor(public dialogRef: MatDialogRef<GadgetPopupDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {

    if (this.message === "create") {
      this.messageDisplay = "EMPLOYEE HAS BEEN CREATED SUCCESSFULLY"
      this.isSuccess = true;
    } else if (this.message === "update") {
      this.messageDisplay = "EMPLOYEE HAS BEEN UPDATED SUCCESSFULLY"
      this.isSuccess = true;
    } else if (this.message === "delete") {
      this.messageDisplay = "EMPLOYEE HAS BEEN DELETED SUCCESSFULLY"
      this.isSuccess = true;
    } else {
      this.messageDisplay = "SORRY!!! AN ERROR HAS OCCURED, PLEASE TRY AGAIN"
      this.isSuccess = false;
    }

  }

  close(): void {
    this.dialogRef.close();
  }

}
