import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { NigeriaStatesService } from 'src/app/services/utils/nigeria-states.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  isEdit: boolean = false;
  user: any;
  fullname: string = '';
  loading: boolean = false;
  formGroup: FormGroup;
  states: { code: string; name: string; }[];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService,
    private nigeriaStatesService: NigeriaStatesService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.states = this.nigeriaStatesService.getAllStates();    
  }
  
  getUserData() {  
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.formGroup = this.formBuilder.group({
      userName: [this.user.role === 'school' ? this.user.school : this.user.fullname, Validators.required],
      userEmail: [this.user.role === 'school' ? this.user.school_email : (this.user.email || this.user.parent_email), Validators.required],
      contactName: [this.user.fullname, Validators.required],
      contactEmail: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required],
      state: [this.user.resident_state, Validators.required],
      address: [this.user.address, Validators.required],
      grade: [this.user.grade],
      dateUpdated: [this.user.updatedAt],
    });
  }
  
  editProfile() {
    this.loading = true;
    const { value } = this.formGroup;

    let payload: any = {
      fullname: this.user.role === 'school' ? value.contactName : value.userName,
      phone: value.phone,
      resident_state: value.state,
    };

    if (this.user.role === 'school') {
      payload.school = value.userName;
    }

    this.authService.updateUser(payload).subscribe({
      next: (res: any) => {
        if (res.status == true) {
          this.authService.addUserDataToLocalStorage(res.data);
          this.appAlertService.showAlert(res.message, AlertType.Success);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      },
      error: (error) => {
        console.error(error);
        this.appAlertService.showAlert(
          error.message
            ? error.message
            : error.error
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
            AlertType.Error
          );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
