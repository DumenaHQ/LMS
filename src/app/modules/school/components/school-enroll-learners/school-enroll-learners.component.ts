import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-school-enroll-learners',
  templateUrl: './school-enroll-learners.component.html',
  styleUrls: ['./school-enroll-learners.component.scss'],
})
export class SchoolEnrollLearnersComponent implements OnInit {
  @Output() addLearnerModal: EventEmitter<any> = new EventEmitter();
  @Output() isAlert: EventEmitter<any> = new EventEmitter();
  @Output() alertMessage = new EventEmitter<string>();
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  user: any;
  selectedFileName: any;
  messageval: string;
  billingId: string = 'single';
  userForm: any = FormGroup;
  isFormSubmitted: boolean = false;
  file: File;
  arrayBuffer: any;
  learnersList: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.userForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      parent_email: ['', [Validators.required, Validators.email]],
      phone: ['00000000000'],
      grade: ['', Validators.required],
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Sign Up
  signup() {
    // Set loading to true
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    // Payload
    let payload = {
      learners: [this.userForm.value],
    };

    // Send users data
    this.authService
      .enrollLearner(payload, `schools/${this.user.id}/learners`)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status == true) {
            // Close Modal
            this.closeAddLearnerModal();

            // Show Popup
            this.showAlert('You have enrolled a student successfully!');

            this.ngOnInit();
          }

          // Show error message
          this.errorMessage = res.message;
          this.showError = true;

          // Set loading to false
          this.loading = false;
        },
        (error: any) => {
          console.log(error);
          // Show error message
          error.error.error.code == 400
            ? (this.errorMessage = error.error.error.errors[0].message)
            : (this.errorMessage = error.error.message);
          this.showError = true;
          // Set loading to false
          this.loading = false;

          // Set Timeout
          // setTimeout(() => {
          //   this.showError = false
          // }, 3000);
        }
      );
  }

  // Sign Up
  batchSignup() {
    // Set loading to true
    this.loading = true;

    // Payload
    let payload = {
      learners: this.learnersList,
    };

    // Send users data
    this.authService
      .enrollLearner(payload, `schools/${this.user.id}/learners`)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === true) {
            // Close Modal
            this.closeAddLearnerModal();

            // Show Popup
            this.showAlert('Students enrolled successfully!');

            window.location.reload();
          }

          // Show error message
          // this.errorMessage = res.message;
          // this.showError = true;

          // // Set loading to false
          // this.loading = false;
        },
        (error: any) => {
          console.log(error);
          // Show error message
          error.error.error.code == 400
            ? (this.errorMessage = error.error.error.errors[0].message)
            : (this.errorMessage = error.error.message);
          this.showError = true;
          // Set loading to false
          this.loading = false;

          // Set Timeout
          // setTimeout(() => {
          //   this.showError = false
          // }, 3000);
        }
      );
  }

  // Show alert popup
  showAlert(messageval: string) {
    this.messageval = messageval;
    // Set alert message
    this.alertMessage.emit(this.messageval);
    this.isAlert.emit();
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
      // learners.forEach((email: any) => {
      //   if (email.__EMPTY_1.includes('.com')) {
      //     // console.log(learners);
      //   }
      // });
      let newLearners = learners.shift();
      this.learnersList = learners.map((learner: any) => ({
        fullname: learner.__EMPTY,
        parent_email: learner.__EMPTY_1,
        grade: learner.__EMPTY_2,
      }));
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  // Close Add Modal
  closeAddLearnerModal() {
    this.addLearnerModal.emit();
  }
}
