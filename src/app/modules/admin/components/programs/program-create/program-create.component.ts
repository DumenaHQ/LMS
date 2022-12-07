import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-program-create',
  templateUrl: './program-create.component.html',
  styleUrls: ['./program-create.component.scss'],
})
export class ProgramCreateComponent implements OnInit {
  programForm: FormGroup;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;

  constructor(
    private programsService: ProgramsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Program form
    this.programForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
    });
  }

  // Create program
  createProgram() {
    // Set loading to true
    this.loading = true;

    // Send users data
    this.programsService.addProgram(this.programForm.value).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.alertMessage = res.message;
          this.showAlertPopup(res.message, 'success');
        }

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.errorMessage = error.error.message;
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
