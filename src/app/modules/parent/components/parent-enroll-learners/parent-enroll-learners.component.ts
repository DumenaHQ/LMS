import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-parent-enroll-learners',
  templateUrl: './parent-enroll-learners.component.html',
  styleUrls: ['./parent-enroll-learners.component.scss'],
})
export class ParentEnrollLearnersComponent implements OnInit {
  @Output() addLearnerModal: EventEmitter<any> = new EventEmitter();
  @Output() isAlert: EventEmitter<any> = new EventEmitter();
  @Output() alertMessaage = new EventEmitter<string>();

  hide: boolean = true;
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  user: any;
  selectedFileName: any;
  messageval: string;
  billingId: string = 'single';
  userForm: any = FormGroup;
  isFormSubmitted: boolean = false;

  selectedAVatarUrl: string = '';
  avatars = [
    {
      id: 1,
      image: 'assets/img/children-avatar/child-avatar-1.png',
      name: 'avatar-1',
      selected: true,
    },
    {
      id: 2,
      image: 'assets/img/children-avatar/child-avatar-2.png',
      name: 'avatar-2',
      selected: false,
    },
    {
      id: 3,
      image: 'assets/img/children-avatar/child-avatar-3.png',
      name: 'avatar-3',
      selected: false,
    },
    {
      id: 4,
      image: 'assets/img/children-avatar/child-avatar-4.png',
      name: 'avatar-4',
      selected: false,
    },
    {
      id: 5,
      image: 'assets/img/children-avatar/child-avatar-5.png',
      name: 'avatar-5',
      selected: false,
    },
    {
      id: 6,
      image: 'assets/img/children-avatar/child-avatar-6.png',
      name: 'avatar-6',
      selected: false,
    },
  ];

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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Select Avatar
  selectAvatar(selected: any) {
    this.avatars.forEach((e: any) => {
      // Set all avatar selected to false
      e.selected = false;
      // Check if the selected id same and is not true
      if (e.id === selected) {
        if (selected !== true) {
          // Set the only selected to true
          e.selected = true;

          // Set avatar url
          this.selectedAVatarUrl = e.image;
        }
      }
    });
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

    let payload = {
      avatar: this.selectedAVatarUrl,
      irstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      password: this.userForm.value.password,
    };

    // Send users data
    this.authService.enrollLearner(payload, 'learners/enroll').subscribe(
      (res: any) => {
        console.log(res);

        if (res.status == true) {
          // Close Modal
          this.closeAddLearnerModal();

          // Show Popup
          this.showAlert();

          // Reload the page
          window.location.reload();
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

  // Show alert popup
  showAlert() {
    this.messageval = 'You have enrolled a child successfully!';
    // Set alert message
    this.alertMessaage.emit(this.messageval);

    this.isAlert.emit();
  }

  // Close Add Modal
  closeAddLearnerModal() {
    this.addLearnerModal.emit();
  }
}
