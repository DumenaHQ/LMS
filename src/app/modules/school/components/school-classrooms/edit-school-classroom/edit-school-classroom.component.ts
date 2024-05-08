import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { TeachersService } from 'src/app/services/teachers.service';
import {
  ClassroomModel,
  Term,
} from '../display-school-classrooms/models/classroom.model';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AlertType } from 'src/app/services/app-alerts/app-alert.service';

@Component({
  selector: 'app-edit-school-classroom',
  templateUrl: './edit-school-classroom.component.html',
  styleUrls: ['./edit-school-classroom.component.scss'],
})
export class EditSchoolClassroomComponent implements OnInit {
  // classroom: ClassroomModel;
  classroom?: ClassroomModel;
  currentClassroom: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  formSubmitAttempted: boolean = false;
  loading: boolean = false;
  dataLoading: boolean = false;
  teachers: any;
  user: any;
  templates: any;
  selectedThumbnailName: string = '';
  selectedHeaderPhotoName: string = '';
  thumbnailFile: File;
  headerPhotoFile: File;
  thumbnailUrl?: string;
  headerPhotoUrl?: string;

  constructor(
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private teachersService: TeachersService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  // classroom form
  formGroup = this.formBuilder.group({
    name: [''],
    template: [''],
    description: [''],
    teacher: [''],
    header_photo: [''],
    thumbnail: [''],
    active_term_start_date: [''],
    active_term_end_date: [''],
  });

  get minDate(): string {
    const termsSorted = (this.classroom?.terms || []).sort((a: Term, b: Term) =>
      moment(a.start_date).diff(b.start_date)
    );

    return moment(termsSorted[0]?.start_date).format('YYYY-MM-DD');
  }

  get maxDate(): string {
    const termsSorted = (this.classroom?.terms || []).sort((a: Term, b: Term) =>
      moment(a.end_date).diff(b.end_date)
    );

    return moment(termsSorted[2]?.end_date).format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get Current classroom
    this.currentClassroom = this.activatedRoute.snapshot.params;
    this.getClassroom();
    this.getClassroomTemplates();
    this.getTeachers();
  }

  // Initialize form
  initForm() {
    this.formGroup.patchValue({
      name: this.classroom?.name,
      template: this.classroom?.template?.id,
      description: this.classroom?.description,
      teacher: this.classroom?.teacher?.id,
      header_photo: this.classroom?.header_photo,
      thumbnail: this.classroom?.thumbnail,
      active_term_start_date: moment(
        this.classroom?.active_term?.start_date
      ).format('YYYY-MM-DD'),
      active_term_end_date: moment(
        this.classroom?.active_term?.end_date
      ).format('YYYY-MM-DD'),
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
          this.initForm();

          this.dataLoading = false;
        },
        error: (e) => {
          this.dataLoading = false;
          console.error(e);
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

  uploadThumbnail(event: any) {
    const file = event.target.files[0];
    this.thumbnailFile = file;
    this.utilsService.imageToBase64(file).then((value: string) => {
      this.thumbnailUrl = value;
    });
    this.selectedThumbnailName = file.name;

    this.formGroup.patchValue({ thumbnail: this.selectedThumbnailName });
  }

  uploadHeaderPhoto(event: any) {
    const file = event.target.files[0];
    this.headerPhotoFile = file;
    this.utilsService.imageToBase64(file).then((value: string) => {
      this.headerPhotoUrl = value;
    });
    this.selectedHeaderPhotoName = file.name;
    this.formGroup.patchValue({ header_photo: this.selectedHeaderPhotoName });
  }

  editClassroom() {
    if (this.formGroup.invalid) {
      this.formSubmitAttempted = true;
      return;
    }

    // Set loading to true
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
          this.alertMessage = data.message;
          this.showAlertPopup(data.message, AlertType.Success);
          // Set Timeout
          setTimeout(() => {
            this.router.navigate([
              `/school/classrooms/${this.currentClassroom.classroomId}/view-classroom`,
            ]);
          }, 3000);
        } else {
          throw data;
        }

        // Set loading to false
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        // Show error message
        this.showAlertPopup(
          error.message ? error.message : error.error
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
          AlertType.Error
        );

        // Set loading to false
        this.loading = false;
      });
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
