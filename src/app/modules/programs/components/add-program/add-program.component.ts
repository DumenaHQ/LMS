import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;
  thumbnailFile: File;
  headerPhotoFile: File;
  selectedThumbnailName: string = '';
  selectedHeaderPhotoName: string = '';
  headerPhotoImagePreview?: string;
  thumbnailImagePreview?: string;
  user: any;

  constructor(
    private programsService: ProgramsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private appAlertService: AppAlertService,
    private utilsService: UtilsService,
    private formErrorService: FormErrorMessageService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;    
    this.initForm();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      header_photo: [''],
      thumbnail: [''],
    });
  }

  selectPhoto(event: any, fileName: string) {
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      if(fileName === 'header_photo') {
        this.headerPhotoFile = file;
        this.selectedHeaderPhotoName = file.name;
      } else if(fileName === 'thumbnail') {
        this.thumbnailFile = file;
        this.selectedThumbnailName = file.name;
      }

      this.utilsService.imageToBase64(file).then((value: string) => {
        if(fileName === 'header_photo') {
          this.headerPhotoImagePreview = value;
        } else if(fileName === 'thumbnail') {
          this.thumbnailImagePreview = value;
        }
      });
    }
  }


  // Create program
  createProgram() {
    this.loading = true;
    const { value } = this.formGroup;

    var formData: any = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    if (this.headerPhotoFile) {
      formData.append('header_photo', this.headerPhotoFile);
    }
    if (this.thumbnailFile) {
      formData.append('thumbnail', this.thumbnailFile);
    }

    this.programsService.addProgram(formData)
      .then(res => {
        if (res.status === true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.navigatePage();
        }
      })
      .catch(error => {
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
      });
  }

  getErrorMessage(controlName: string, labelName: string): string {
    const control = this.formGroup.get(controlName);
    const errors = control?.errors;
    return this.formErrorService.getErrorMessage(errors, labelName);
  }

  navigatePage() {
    this.router.navigate([
      `/${this.user.role}/programs`,
    ]);
  }

}

