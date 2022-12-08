import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {
  hide: boolean = true;
  id: string = 'set-new-password';
  currentParamsIds: any;
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  userForm: any;
  isFormSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // get email_hash and hash_string
    this.currentParamsIds = this.activatedRoute.snapshot.params;

    // User form
    this.userForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Show Section
  showSect(ids: any) {
    this.id = ids;
  }

  resetNewPassword() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    let payload = {
      email_hash: this.currentParamsIds.email_hash,
      hash_string: this.currentParamsIds.hash_string,
      password: this.userForm.value.password,
    };

    this.authService.resetPassword(payload).subscribe(
      (res: any) => {
        console.log(res);

        if (res.status === true) {
          // Show check email section
          this.id = 'reset-successful';
        }
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
}
