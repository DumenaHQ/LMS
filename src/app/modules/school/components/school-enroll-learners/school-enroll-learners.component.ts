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
  isAlert: boolean = true;
  alertMessage: string;
  alertColor: string;
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
      parent_email: ['', [Validators.email]],
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
            
            // Show Popup
            this.showAlertPopup(`${res.message}. An email has been sent containing the login credentials of ${this.userForm.value.fullname}`, 'success');

            // Close Modal
            // this.closeAddLearnerModal();
            
            setTimeout(() => {
                window.location.reload();
              }, 4000);
          }
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
          console.log(res);
          // parentcook@gmail.com

          if (res.status === true) {
            
            // Show Popup
            this.showAlertPopup(`${res.message}. An email has been sent containing the login details for all enrolled learners`, 'success');

            // Close Modal
            // this.closeAddLearnerModal();
            
            setTimeout(() => {
                window.location.reload();
              }, 4000);

          }
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


  // Show alert
  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
}
