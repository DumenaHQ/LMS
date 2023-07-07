import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-parent-signup',
  templateUrl: './parent-signup.component.html',
  styleUrls: ['./parent-signup.component.scss'],
})
export class ParentSignupComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  userEvent: any;
  userForm: FormGroup;
  isFormSubmitted: boolean = false;

  statesInNigeria = [
    {
      code: 'FC',
      name: 'FCT',
    },
    {
      code: 'AB',
      name: 'Abia',
    },
    {
      code: 'AD',
      name: 'Adamawa',
    },
    {
      code: 'AK',
      name: 'AkwaIbom',
    },
    {
      code: 'AN',
      name: 'Anambra',
    },
    {
      code: 'BA',
      name: 'Bauchi',
    },
    {
      code: 'BY',
      name: 'Bayelsa',
    },
    {
      code: 'BE',
      name: 'Benue',
    },
    {
      code: 'BO',
      name: 'Borno',
    },
    {
      code: 'CR',
      name: 'CrossRiver',
    },
    {
      code: 'DE',
      name: 'Delta',
    },
    {
      code: 'EB',
      name: 'Ebonyi',
    },
    {
      code: 'ED',
      name: 'Edo',
    },
    {
      code: 'EK',
      name: 'Ekiti',
    },
    {
      code: 'EN',
      name: 'Enugu',
    },
    {
      code: 'GO',
      name: 'Gombe',
    },
    {
      code: 'IM',
      name: 'Imo',
    },
    {
      code: 'JI',
      name: 'Jigawa',
    },
    {
      code: 'KD',
      name: 'Kaduna',
    },
    {
      code: 'KN',
      name: 'Kano',
    },
    {
      code: 'KT',
      name: 'Katsina',
    },
    {
      code: 'KE',
      name: 'Kebbi',
    },
    {
      code: 'KO',
      name: 'Kogi',
    },
    {
      code: 'KW',
      name: 'Kwara',
    },
    {
      code: 'LA',
      name: 'Lagos',
    },
    {
      code: 'NA',
      name: 'Nassarawa',
    },
    {
      code: 'NI',
      name: 'Niger',
    },
    {
      code: 'OG',
      name: 'Ogun',
    },
    {
      code: 'ON',
      name: 'Ondo',
    },
    {
      code: 'OS',
      name: 'Osun',
    },
    {
      code: 'OY',
      name: 'Oyo',
    },
    {
      code: 'PL',
      name: 'Plateau',
    },
    {
      code: 'RI',
      name: 'Rivers',
    },
    {
      code: 'SO',
      name: 'Sokoto',
    },
    {
      code: 'TA',
      name: 'Taraba',
    },
    {
      code: 'YO',
      name: 'Yobe',
    },
    {
      code: 'ZA',
      name: 'Zamfara',
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get user event
    this.userEvent = JSON.parse(localStorage.getItem('event') || '[]');
    this.userForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      resident_state: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

    // Set payload
    let payload = {
      fullname: this.userForm.value.fullname,
      email: this.userForm.value.email,
      resident_state: this.userForm.value.resident_state,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      user_type: 'parent',
      event: this.userEvent.event,
    };

    // Send users data
    this.authService.addUser(payload).subscribe(
      (res: any) => {
        console.log(res);

        if (res.status == true) {
          // Store user data to localstorage
          this.authService.addUserDataToLocalStorage(res.data);

          // Remove event from localstorage
          localStorage.removeItem('event');

          // Navigate to Dashboard
          this.router.navigate(['/verify-email']);
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

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
