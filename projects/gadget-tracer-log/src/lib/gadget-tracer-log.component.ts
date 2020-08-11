import { Component, Inject, ViewChild, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { GadgetTracerLogService } from "./gadget-tracer-log.service";
import { GadgetSymptomConfigFormComponent, FormMode } from "./gadget-symptom-config-form/gadget-symptom-config-form.component";
import { FormControl } from '@angular/forms';
import {MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource} from "@angular/material/table";
import { MatSort} from '@angular/material';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'lib-gadget-tracer-log',
  templateUrl: './gadget-tracer-log.component.html',
  styleUrls: ['./gadget-tracer-log.component.scss'],

})
export class GadgetTracerLogComponent implements OnInit {

  filterForm: FormGroup;
  searchResultMessage: string;
  showProgressBar: boolean = false;
  dataSource = new MatTableDataSource<Employee>();
  hideFilters: boolean = false;
  allDistrict: District[];
  totalCount: number = 0;
  id: string;
  
  SymptomRecord: Employee;
  districtList: any = [];
  mode: FormMode = FormMode.NEW;
  formMode = FormMode;
  employeeRecords : FormGroup;
  displayedColumns: string[] = ["first_name", "last_name", "gender", "skills", "contact_no", "address", "dob"];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; 
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
    private GadgetTracerLogService: GadgetTracerLogService ,private cdr: ChangeDetectorRef,) {
    this.filterForm = formBuilder.group({
      first_name: null,
      last_name:null,
      district :null,
      date_from:null,
      gender:null,
      date_to:null,
      skills:null,
      contact_no:null,
      address:null,
      dob:null
    });
  }
  ngOnInit(){
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 10;
      //Defining formcontrollers for 
      this.employeeRecords = new FormGroup({
      district: new FormControl(),
      first_name: new FormControl(),
      last_name:new FormControl(),
      date_from:new FormControl(),
      date_to:new FormControl(),
      gender:new FormControl(),
      skills:new FormControl(),
      contact_no:new FormControl(),
      address:new FormControl(),
      dob:new FormControl()
    });
    this.load(); //Calling load methods when page load
  }

  //Search method for the Search function
  search() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.getEmployee(); //Calling get employee details with parameters
  }

  //Poulate all employee details to datasource
  getEmployee() {
    this.searchResultMessage = null;
    this.dataSource.data = [];
    this.showProgressBar = true;
    var requestObj = {
      first: ((this.paginator.pageSize * (this.paginator.pageIndex + 1)) - (this.paginator.pageSize) + 1) + '',
      maxResults: this.paginator.pageSize + ''
    }

    if (this.filterForm.value.first_name) {
      requestObj["first_name"] = this.filterForm.value.first_name.trim();
    }
    if (this.filterForm.value.last_name) {
      requestObj["last_name"] = this.filterForm.value.last_name.trim();
    }
    if (this.filterForm.value.date_to) {
      requestObj["date_to"] = moment(this.filterForm.value.date_to).format("YYYY-MM-DD");
    }
    if (this.filterForm.value.date_from) {
      requestObj["date_from"] = moment(this.filterForm.value.date_from).format("YYYY-MM-DD");
    }
    if (this.filterForm.value.district) {
      requestObj["district"] = this.filterForm.value.district.trim();
    }
    if (this.filterForm.value.gender) {
      requestObj["gender"] = this.filterForm.value.gender.trim();
    }

    this.GadgetTracerLogService.getEmployee(requestObj)
      .subscribe(
        (data: any) => {
          this.dataSource.data = data.list as Employee[];
          if (data) {
            if (data.noOfRecords == 0) {
              this.searchResultMessage = "No Data Available!";
              this.totalCount = 0;
              this.showProgressBar = false;
            } else {
              this.dataSource.data = data.list as Employee[];
              this.cdr.detectChanges();
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.totalCount = data.noOfRecords || this.totalCount;
              this.showProgressBar = false;
            }
          }
        },
        error => {
        }
      );
  }
  radioChange(e) {
    this.filterForm.get("gender").setValue(e.value);
  }
  getDistrict(e) {
    this.filterForm.get("district").setValue(e);
  }
  
  getDistcrict() {
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

  load() {
    this.getEmployee(); //Get all employee details when page loads
    this.getDistcrict() //Get all districts details when page loads
  }
  //Open CRUD form with passing from mode as NEW 
  openCreateDialog(): void {
    const activeModal = this.dialog.open(GadgetSymptomConfigFormComponent, {
      width: "900%",
      maxWidth: "90vw",
      maxHeight: "100vh",
      disableClose: true
    });
    activeModal.componentInstance.mode = FormMode.NEW;
    activeModal.componentInstance.reload.subscribe(this.load.bind(this));
    activeModal.componentInstance.isOnViewMode = false;
    activeModal.componentInstance.load();

  }
  //Open CRUD form with passing from mode as UPDATE 
  updateSymptomCodeConfigDialog(row: any) {
    const activeModal = this.dialog.open(GadgetSymptomConfigFormComponent, {
      width: "95%",
      maxWidth: "100vw",
      maxHeight: "100vh",
      disableClose: true
    });
    activeModal.componentInstance.mode = FormMode.UPDATE;
    activeModal.componentInstance.id = row.id;
    activeModal.componentInstance.reload.subscribe(this.load.bind(this));
    activeModal.componentInstance.isOnViewMode = true;
    activeModal.componentInstance.load();
  }

}

export interface Employee {
  id:string;
  first_name: string;
  last_name: string;
  gender: string;
  date_to: string;
  date_from: string;
  skills: string;  
  contact_no: string;
  address: string;
  district: string;
  dob: string;

}
export interface District {
  id: string;
  name: string;
}
export interface Pagination {
  totalItems: number;
  pageSize: number;
  currentPage: number;
}



