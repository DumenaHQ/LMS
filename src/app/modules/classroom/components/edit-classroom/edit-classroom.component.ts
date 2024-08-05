import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { TeachersService } from 'src/app/services/teachers.service';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { ClassroomModel } from '../../models/classroom.model';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {

  classroom?: ClassroomModel;
  currentClassroom: any;
  loading: boolean = false;
  dataLoading: boolean = false;
  teachers: any;
  user: any;
  templates: any;
  thumbnailFile: File;
  headerPhotoFile: File;
  selectedThumbnailName: string = '';
  selectedHeaderPhotoName: string = '';
  headerPhotoImagePreview?: string;
  thumbnailImagePreview?: string;
  formGroup: FormGroup 

  constructor(
    private classroomService: ClassroomService,
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
    const startDate = this.classroom?.active_term?.start_date;
    if (!startDate) return;

    return moment(startDate).format('YYYY-MM-DD');
  }

  get maxDate(): string | undefined {
    const endDate = this.classroom?.active_term?.end_date;
    if (!endDate) return;

    return moment(endDate).format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.user = this.authService.getUser().user;
    this.currentClassroom = this.activatedRoute.snapshot.params;
    this.initForm();
    this.getClassroom();
    this.getClassroomTemplates();
    this.getTeachers();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      template: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      header_photo: [''],
      thumbnail: [''],
      active_term_start_date: ['', [Validators.required]],
      active_term_end_date: ['', [Validators.required]],
    });
  }

  // Get Classroom
  getClassroom() {
    this.dataLoading = true;
    this.classroomService
      .getClassroomById(this.currentClassroom.classroomId)
      .subscribe({
        next: (res: any) => {
          this.classroom = res.data.class;
          this.formGroup.patchValue({
            name: this.classroom?.name,
            template: this.classroom?.template?.id,
            description: this.classroom?.description,
            teacher: this.classroom?.teacher?.id,
            active_term_start_date: moment(
              this.classroom?.active_term?.start_date
            ).format('YYYY-MM-DD'),
            active_term_end_date: moment(
              this.classroom?.active_term?.end_date
            ).format('YYYY-MM-DD'),
          });
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          this.dataLoading = false;
        },
      });
  }

  // Get classroom templates
  getClassroomTemplates() {
    this.classroomService.getClassroomTemplates().subscribe({
      next: (res: any) => {
        this.templates = res.data.classTemplates;
      },
      error: (e) => console.error(e),
    });
  }

  // Get Teachers
  getTeachers() {
    this.teachersService.fetchTeachersInSchool(this.user.id).subscribe({
      next: (res: any) => {
        this.teachers = res.data.teachers;
      },
      error: (e) => console.error(e),
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

  editClassroom() {
    this.loading = true;
    const { value } = this.formGroup;
    if (!value.active_term_start_date || !value.active_term_end_date) {
      return;
    }

    const startDate = value.active_term_start_date;
    const endDate = value.active_term_end_date;

    const start = startDate && new Date(startDate);
    const end = endDate && new Date(endDate);

    var formData: any = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('template', value.template);
    formData.append('teacher_id', value.teacher);
    formData.append('active_term_start_date', new Date(start).toISOString());
    formData.append('active_term_end_date', new Date(end).toISOString());
    if (this.headerPhotoFile) {
      formData.append('header_photo', this.headerPhotoFile);
    }
    if (this.thumbnailFile) {
      formData.append('thumbnail', this.thumbnailFile);
    }

    this.classroomService
      .editClassroom(formData, this.currentClassroom.classroomId)
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
        '/school/classrooms',
      ]);
    } else if(pageNumber === 2) {
      this.router.navigate([
        `/school/classrooms/${this.currentClassroom.classroomId}/view-classroom`,
      ]);
    }
  }
}

