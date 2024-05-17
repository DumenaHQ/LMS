import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-school-enroll-learners',
  templateUrl: './school-enroll-learners.component.html',
  styleUrls: ['./school-enroll-learners.component.scss'],
})
export class SchoolEnrollLearnersComponent implements OnInit {
  @Output() addLearnerModal: EventEmitter<any> = new EventEmitter();
  @Output() getAllStudents: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  user: any;
  selectedFileName: any;
  messageval: string;
  billingId: string = 'single';
  formGroup: any = FormGroup;
  file: File;
  arrayBuffer: any;
  learnersList: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.formGroup = this.formBuilder.group({
      fullname: ['', Validators.required],
      parent_email: ['', [Validators.required, Validators.email]],
      grade: ['', Validators.required],
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Sign Up
  singleSignup() {
    // Set loading to true
    this.loading = true;

    // Payload
    let payload = {
      learners: [this.formGroup.value],
    };

    // Send users data
    this.authService
      .enrollLearner(payload, `schools/${this.user.id}/learners`)
      .subscribe(
        (res: any) => {
          if (res.status == true) {
            this.appAlertService.showAlert(`${res.message}. An email has been sent containing the login credentials of ${this.formGroup.value.fullname}`, AlertType.Success);
          }
          this.closeAddLearnerModal();
          this.getAllStudents.emit();
        },
        (error: any) => {
          console.log(error);
          this.appAlertService.showAlert(
            error.error.error.code == 400
            ? (error.error.error.errors[0].message)
            : (error.error.message),
            AlertType.Error
          );
          this.loading = false;
        }
      );
  }

  // Batch signup
  batchSignup() {
    // Set loading to true
    this.loading = true;

    if (this.learnersList === undefined) {
      this.loading = false;

      return;
    }

    // Payload
    let payload = {
      learners: this.learnersList,
    };

    // Send users data
    this.authService
      .enrollLearner(payload, `schools/${this.user.id}/learners`)
      .subscribe(
        (res: any) => {
          if (res.status === true) {
            this.appAlertService.showAlert(`${res.message}. An email has been sent containing the login credentials of ${this.formGroup.value.fullname}`, AlertType.Success);
          }
          this.closeAddLearnerModal();
          this.getAllStudents.emit();
        },
        (error: any) => {
          console.log(error);
          this.appAlertService.showAlert(
            error.error.error.code == 400
            ? (error.error.error.errors[0].message)
            : (error.error.message),
            AlertType.Error
          );
          this.loading = false;
        }
      );
  }

  // Upload File
  uploadFile(event: any) {
    this.file = event.target.files[0];
    // Set file name
    this.selectedFileName = this.file.name;

    // Extract emails from xlxs sheet
    let fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let learners = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      
      // let newLearners = learners.shift();
      this.learnersList = learners.map((learner: any) => ({
        fullname: learner['Student Name'],
        parent_email: learner['Parent Email'],
        grade: learner['Class/Grade'],
      }));
      
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  // Close Add Modal
  closeAddLearnerModal() {
    this.addLearnerModal.emit();
  }
}
