import { Component, OnInit, EventEmitter,ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { GadgetTracerLogService } from "../gadget-tracer-log.service";
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {Employee,District} from 'projects/gadget-tracer-log/src/lib/gadget-tracer-log.component';
import { GadgetPopupDialogComponent } from '../gadget-popup-dialog/gadget-popup-dialog.component';
import { GadgetSymptomDeleteSelectDialogComponent } from '../gadget-symptom-delete-select-dialog/gadget-symptom-delete-select-dialog.component';
import * as _moment from 'moment';
const moment = _moment; 



@Component({
  selector: 'gadget-symptom-config-form',
  templateUrl: './gadget-symptom-config-form.component.html',
  styleUrls: ['./gadget-symptom-config-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GadgetSymptomConfigFormComponent implements OnInit {
  title: string;
  allDistrict: District[];
  dis : District;
  districtList: any = [];
  id: string;
  titleDisplay: boolean = true
  skilltemp: String;
  mode: FormMode = FormMode.NEW;
  formMode = FormMode;
  userCreateForm: FormGroup;
  EmployeeRecord: Employee;
  isOnViewMode = false;
  reload: EventEmitter<string> = new EventEmitter();
  showProgressBar: boolean = false;
  existMessage: string = "";
  showFormContent: boolean = true;
  isExist: boolean = false;
  marked = false; 
  submitted = false;  

  constructor(private dialogRef: MatDialogRef<GadgetSymptomConfigFormComponent>, private dialog: MatDialog, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private GadgetTracerLogService: GadgetTracerLogService, ) {
  }
  ngOnInit(): void {
    this.userCreateForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl(),
      dob: new FormControl(),
      contact_no: new FormControl(),
      address: new FormControl(),
      gender: new FormControl(),
      date_to: new FormControl(),
      date_from: new FormControl(),
      district: new FormControl(),
      skills: new FormControl()
    });

    //Load update data relevent to the employee id to theform if the form mode is update 
    if (this.mode == FormMode.UPDATE) {
      this.GadgetTracerLogService.getEmployeebyID(this.id).subscribe((data: any) => {
      this.EmployeeRecord = data;
      console.log("update",data);
      this.userCreateForm.get("district").setValue(data.User.district);
      this.userCreateForm.get("first_name").setValue(data.User.first_name);
      this.userCreateForm.get("last_name").setValue(data.User.last_name);
      this.userCreateForm.get("dob").setValue(data.User.dob);
      this.userCreateForm.get("contact_no").setValue(data.User.contact_no);
      this.userCreateForm.get("address").setValue(data.User.address);
      this.userCreateForm.get("gender").setValue(data.User.gender);
      this.userCreateForm.get("date_to").setValue(data.User.date_to);
      this.userCreateForm.get("date_from").setValue(data.User.date_from);
      this.userCreateForm.get("skills").setValue(data.User.skills);
      });
    }
    this.getDistricts();
  }
load() {
    this.userCreateForm = this.formBuilder.group({
      id:null,
      first_name: null,
      last_name: null,
      dob: null,
      contact_no: null,
      address: null,
      gender: null,
      date_to: null,
      date_from: null,
      district: null,
      skills: null
    });
}

radioChange(e) {
    this.userCreateForm.get("gender").setValue(e.value);
}
getSkills(e) {
    if (this.userCreateForm.get('skills').value != null) {
      if (e.checked == true) {
        this.skilltemp = this.skilltemp + "," + e.source.value;
        this.userCreateForm.get("skills").setValue(this.skilltemp);
      }
      else if (e.checked == false) {
        let skillArray = (this.skilltemp).split(",");
        let newString;

        for (var i = 0; i < (this.skilltemp).split(',').length; i++) {
          if (e.source.value == skillArray[i]) {
            skillArray[i] = "";
          }

          if (newString == null) {
            newString = skillArray[i];
          } else {
            newString = newString + ", " + skillArray[i]
          }
        }
        this.skilltemp = newString;
        this.userCreateForm.get("skills").setValue(this.skilltemp);
      }
    }
    // To capture the first skill data
    else {
      this.userCreateForm.get("skills").setValue(e.source.value);
      this.skilltemp = this.userCreateForm.get('skills').value;
    }
}
  


save(options) {
    this.showProgressBar = true;
    this.showFormContent = false;
    this.isExist = false;
    if (this.mode == FormMode.NEW) {
      this.GadgetTracerLogService.createUser({
        first_name: this.userCreateForm.get('first_name').value,
        last_name: this.userCreateForm.get('last_name').value,
        dob: moment(this.userCreateForm.get('dob').value).format("YYYY-MM-DD"),
        gender: this.userCreateForm.get("gender").value,
        skills:this.userCreateForm.get("skills").value,
        date_from: moment(this.userCreateForm.get('date_from').value).format("YYYY-MM-DD"),
        date_to: moment(this.userCreateForm.get('dob').value).format("YYYY-MM-DD"),
        district: this.userCreateForm.get('district').value,
        contact_no: this.userCreateForm.get('contact_no').value,
        address: this.userCreateForm.get('address').value,
      }).subscribe((data: any) => {
      
        if (data.status === "userExist") {
          this.isExist = true;
          this.existMessage = "User is already used !";
          this.showProgressBar = false;
          this.showFormContent = true;
        } else {
          if (options == 'exit') {
            this.reload.emit();
            this.showProgressBar = false;
            this.openDialogCreateSucess();
            this.dialogRef.close();
          } else {
            this.showProgressBar = false;
            this.showFormContent = true;
            this.openDialogCreateSucess();
            this.id = data.employee.id;
            this.mode = FormMode.UPDATE
          }
        }
      },
        error => {
          console.log(error);
          this.openDialogFailed();
          this.showProgressBar = false;
          this.showFormContent = true;
        });
    }
    else {
      this.GadgetTracerLogService.createUser({
        id: this.id,
        first_name: this.userCreateForm.get('first_name').value,
        last_name: this.userCreateForm.get('last_name').value,
        dob: moment(this.userCreateForm.get('dob').value).format("YYYY-MM-DD"),
        gender: this.userCreateForm.get('gender').value,
        date_from: moment(this.userCreateForm.get('date_from').value).format("YYYY-MM-DD"),
        date_to: moment(this.userCreateForm.get('dob').value).format("YYYY-MM-DD"),
        skills: this.userCreateForm.get('skills').value,
        district: this.userCreateForm.get('district').value,
        contact_no: this.userCreateForm.get('contact_no').value,
        address: this.userCreateForm.get('address').value,

      }).subscribe((data: any) => {
        if (data.status === "userExist") {
          this.isExist = true;
          this.existMessage = "User is already used !";
          this.showProgressBar = false;
          this.showFormContent = true;
        } else {
          if (options == 'exit') {
            this.reload.emit();
            this.showProgressBar = false;
            this.openDialogUpdateSucess();
            this.dialogRef.close();
          } else {
            this.showProgressBar = false;
            this.showFormContent = true;
            this.openDialogUpdateSucess();
          }
        }
      },
        error => {
          console.log(error);
          this.openDialogFailed();
          this.showProgressBar = false;
          this.showFormContent = true;
        });
    }
}

getDistricts() {
    this.GadgetTracerLogService.getDistcrict()
      .subscribe(
        (data: any) => {
          this.allDistrict = data.districts as District[];
          this.allDistrict.forEach(element => {
            this.districtList.push(element);
          });
        }
      );
}

openDialogCreateSucess(): void {
  this.dialog.open(GadgetPopupDialogComponent, {
    width: '40%',
    data: "create"
  });
}

openDialogFailed(): void {
  this.dialog.open(GadgetPopupDialogComponent, {
    width: '40%',
    data: "failure",
  });
}

openDialogUpdateSucess(): void {
  this.dialog.open(GadgetPopupDialogComponent, {
    width: '40%',
    data: "update"
  });
}

toggleVisibility(e) {
  this.marked = e.target.checked;
}


//delete an employee by ID
deleteEmployee(id: string) {
  this.GadgetTracerLogService.getEmployeebyID(id).subscribe((res: any) => {
    const dialogPrompt = this.dialog.open(GadgetSymptomDeleteSelectDialogComponent, {
      width: '650px',
      data: "Do you want ​to​ Remove​ this EMPLOYEE?",
      disableClose: true
    });
    dialogPrompt.afterClosed().subscribe(result => {
      this.titleDisplay = false
      this.title = 'DELETE EMPLOYEE '
      this.showProgressBar = true;
      this.showFormContent = false;
      if (result) {
        this.GadgetTracerLogService.delete(id).subscribe((data: any) => {
          this.showProgressBar = false;
          this.dialogRef.close();
          this.reload.emit();
          this.openDialogDeleteSucess();
        }, error => {
          console.log(error);
          this.openDialogDeleteSucess();
        });
      } else {
        this.showProgressBar = false;
        this.showFormContent = true;
      }
    });
  });
}

cancel() {
    this.reload.emit();
    this.dialogRef.close();
  }
  openDialogDeleteSucess(): void {
    this.dialog.open(GadgetPopupDialogComponent, {
      width: '40%',
      data: "delete"
    });
  }

}
export enum FormMode {
  NEW, UPDATE
} 

