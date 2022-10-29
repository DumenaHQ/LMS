import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school-signup',
  templateUrl: './school-signup.component.html',
  styleUrls: ['./school-signup.component.scss'],
})
export class SchoolSignupComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;

  statesInNigeria = [
    {
      code: 'FC',
      name: 'Abuja',
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

  projects: any;
  userEvent: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get user event
    this.userEvent = JSON.parse(localStorage.getItem('event') || '[]');
  }

  // Sign Up
  signUp(data: any) {
    // Set loading to true
    this.loading = true;

    let payroll = {
      fullname: data.full_name,
      email: data.email,
      user_type: 'school',
      password: data.password,
      phone: data.phone,
      resident_state: data.resident_state,
      school: data.school,
      address: data.address,
      event: this.userEvent.event,
    };

    // Send users data
    this.authService.addUser(payroll).subscribe(
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
