import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school-enroll-learners',
  templateUrl: './school-enroll-learners.component.html',
  styleUrls: ['./school-enroll-learners.component.scss'],
})
export class SchoolEnrollLearnersComponent implements OnInit {
  @Output() addLearnerModal: EventEmitter<any> = new EventEmitter();
  @Output() isAlert: EventEmitter<any> = new EventEmitter();
  @Output() alertMessaage = new EventEmitter<string>();
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  user: any;
  selectedFileName: any;
  messageval: string;
  billingId: string = 'single';
  userForm: any = FormGroup;
  isFormSubmitted: boolean = false;

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
      grade: ['', Validators.required],
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Sign Up
  signUp() {
    // Set loading to true
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    console.log(this.userForm.value);

    // Send users data
    // this.authService.enrollChild(payload).subscribe(
    //   (res: any) => {
    //     console.log(res);

    //     if (res.status == true) {
    //       // Close Modal
    //       this.closeaddLearnerModal();

    //       // Show Popup
    //       this.showAlert();

    //       // Reload the page
    //       window.location.reload();
    //     }

    //     // Show error message
    //     this.errorMessage = res.message;
    //     this.showError = true;

    //     // Set loading to false
    //     this.loading = false;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     // Show error message
    //     error.error.error.code == 400
    //       ? (this.errorMessage = error.error.error.errors[0].message)
    //       : (this.errorMessage = error.error.message);
    //     this.showError = true;
    //     // Set loading to false
    //     this.loading = false;

    //     // Set Timeout
    //     // setTimeout(() => {
    //     //   this.showError = false
    //     // }, 3000);
    //   }
    // );
  }

  // Show alert popup
  showAlert() {
    this.messageval = 'You have enrolled a child successfully!';
    // Set alert message
    this.alertMessaage.emit(this.messageval);

    this.isAlert.emit();
  }

  // Upload File
  uploadFile(event: any) {
    this.selectedFileName = event.target.files[0].name;
  }

  // Close Add Modal
  closeAddLearnerModal() {
    this.addLearnerModal.emit();
  }
}
