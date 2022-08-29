import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get email_hash and hash_string
    this.currentParamsIds = this.activatedRoute.snapshot.params;
    console.log(this.currentParamsIds);
  }

  // Show Section
  showSect(ids: any) {
    this.id = ids;
  }

  resetNewPassword(data: any) {
    // Start loading
    this.loading = true;

    let payload = {
      email_hash: this.currentParamsIds.email_hash,
      hash_string: this.currentParamsIds.hash_string,
      password: data.password,
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
