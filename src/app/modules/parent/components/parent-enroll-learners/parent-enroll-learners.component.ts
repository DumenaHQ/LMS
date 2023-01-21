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
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;

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

  selectedAVatarUrl: string = 'assets/img/children-avatar/child-avatar-1.png';
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
  ) { }

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
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      password: this.userForm.value.password,
    };

    // Send users data
    this.authService.enrollLearner(payload, 'learners/enroll').subscribe(
      (res: any) => {
        console.log(res);

        if (res.status == true) {
          // Show Popup

          const message = res.message + '. Check your email for the login credentials';
          this.showAlertPopup(message, 'success');
          // Reload the page
          setTimeout(() => {
            window.location.reload();
          }, 9000);
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
    }, 9000);
  }
}
