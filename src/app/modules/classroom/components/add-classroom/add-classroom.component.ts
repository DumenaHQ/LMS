import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;
  selectedThumbnailName: string = '';
  selectedHeaderPhotoName: string = '';
  thumbnailFile: File;
  headerPhotoFile: File;
  templates: any;
  teachers: any;
  user: any;

  constructor(
    private teachersService: TeachersService,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private appAlertService: AppAlertService,
  ) {}

  ngOnInit(): void {
    let userData = this.authService.getUser();
    this.user = userData.user;
    
    this.initForm();
    this.getClassroomTemplates();
    this.getTeachers();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      template: [''],
      teacher: [''],
      header_photo: [''],
      thumbnail: [''],
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

  // Get teachers
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
    this.selectedThumbnailName = file.name;
    this.formGroup.patchValue({thumbnail: this.selectedThumbnailName}); 
  }

  uploadHeaderPhoto(event: any) {
    const file = event.target.files[0];
    this.headerPhotoFile = file;
    this.selectedHeaderPhotoName = file.name;
    this.formGroup.patchValue({header_photo: this.selectedHeaderPhotoName})
  }


  // Create program
  createClassroom() {
    this.loading = true;
    const { value } = this.formGroup;

    var formData: any = new FormData();
    formData.append('name', value.name);
    formData.append('template', value.template);
    formData.append('teacher_id', value.teacher);
    if (this.headerPhotoFile) {
      formData.append('header_photo', this.headerPhotoFile);
    }
    if (this.thumbnailFile) {
      formData.append('thumbnail', this.thumbnailFile);
    }

    this.classroomService.addClassroom(formData)
      .then(res => {
        if (res.status === true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.router.navigate(['school/classrooms']);
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

  navigatePage() {
    this.router.navigate([
      '/school/classrooms',
    ]);
  }

}
