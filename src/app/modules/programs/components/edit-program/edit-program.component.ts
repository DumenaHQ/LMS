import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeachersService } from 'src/app/services/teachers.service';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss']
})
export class EditProgramComponent implements OnInit {

  program: any;
  loading: boolean = false;
  dataLoading: boolean = false;
  user: any;
  thumbnailFile: File;
  headerPhotoFile: File;
  selectedThumbnailName: string = '';
  selectedHeaderPhotoName: string = '';
  headerPhotoImagePreview?: string;
  thumbnailImagePreview?: string;
  formGroup: FormGroup;

  constructor(
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private teachersService: TeachersService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private appAlertService: AppAlertService,
    private formErrorService: FormErrorMessageService
  ) {}

  get minDate(): string | undefined {
    const startDate = this.program?.active_term?.start_date;
    if (!startDate) return;

    return moment(startDate).format('YYYY-MM-DD');
  }

  get maxDate(): string | undefined {
    const endDate = this.program?.active_term?.end_date;
    if (!endDate) return;

    return moment(endDate).format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.user = this.authService.getUser().user;

    // Get Current program
    this.program = this.activatedRoute.snapshot.params;
    this.getProgram();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.program?.name, [Validators.required]],
      description: [this.program?.description, [Validators.required]],
      header_photo: [this.program?.header_photo],
      thumbnail: [this.program?.thumbnail],
    });
  }

  // Get program
  getProgram() {
    this.dataLoading = true;
    this.programsService
      .getProgramsById(this.program.programId)
      .subscribe({
        next: (res: any) => {
          this.program = res.data.program;
          this.initForm();
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          this.dataLoading = false;
        },
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

  editProgram() {
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

    this.programsService
      .editProgram(formData, this.program.programId)
      .then(res => res.json()).then((data) => {
        if (data.status) {
          this.appAlertService.showAlert(data.message, AlertType.Success);
          this.navigatePage(2);
        } else {
          throw data;
        }
        this.loading = false;
      })
      .catch((error) => {
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

  navigatePage(pageNumber: number) {
    if(pageNumber === 1) {
      this.router.navigate([
        `/${this.user.role}/programs`,
      ]);
    } else if(pageNumber === 2) {
      this.router.navigate([
        `/${this.user.role}/programs/${this.program.programId}/view-program`,
      ]);
    }
  }
}


