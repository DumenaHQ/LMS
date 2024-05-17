import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-parent-signup',
  templateUrl: './parent-signup.component.html',
  styleUrls: ['./parent-signup.component.scss'],
})
export class ParentSignupComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  userEvent: any;
  formGroup: FormGroup;

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
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService
  ) {}

  ngOnInit(): void {
    // Get user event
    this.userEvent = JSON.parse(localStorage.getItem('event') || '[]');
    this.formGroup = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      resident_state: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6), this.alphanumericSymbolPasswordValidator()]],
    });
  }

  // Sign Up
  signUp() {
    this.loading = true;

    let payload = {
      fullname: this.formGroup.value.fullname,
      email: this.formGroup.value.email,
      resident_state: this.formGroup.value.resident_state,
      phone: this.formGroup.value.phone,
      password: this.formGroup.value.password,
      user_type: 'parent',
      event: this.userEvent.event,
    };

    this.authService.addUser(payload).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.authService.addUserDataToLocalStorage(res.data);
          localStorage.removeItem('event');
          this.router.navigate(['/verify-email']);
        }

        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.message
            ? error.error.message
            : error.message
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
          AlertType.Error
        );
        this.loading = false;
      }
    );
  }

  // validate password
  alphanumericSymbolPasswordValidator() {
    return (control: FormGroup) => {
      const password = control.value;
  
      // Check if the password contains at least one letter (alphabetical character)
      const containsLetter = /[a-zA-Z]/.test(password);
  
      // Check if the password contains at least one digit (numerical character)
      const containsDigit = /\d/.test(password);
  
      // Check if the password contains at least one symbol (any symbol)
      const containsSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
      if (!containsLetter || !containsDigit || !containsSymbol) {
        // Return an error object if the password doesn't meet the criteria
        return { alphanumericSymbolPassword: true };
      }
  
      // Return null if the password is valid
      return null;
    };
  }

  // Go Back to the previous page
  goBack() {
    this.router.navigate(['signup']);
  }
}
