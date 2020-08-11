import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'gadget-symptom-delete-select-dialog',
  templateUrl: './gadget-symptom-delete-select-dialog.component.html',
  styleUrls: ['./gadget-symptom-delete-select-dialog.component.scss']
})
export class GadgetSymptomDeleteSelectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GadgetSymptomDeleteSelectDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

}
