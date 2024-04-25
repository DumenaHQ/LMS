import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { ClassroomModel } from '../display-school-classrooms/models/classroom.model';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-school-classroom',
  templateUrl: './edit-school-classroom.component.html',
  styleUrls: ['./edit-school-classroom.component.scss']
})
export class EditSchoolClassroomComponent implements OnInit {

  // classroom: ClassroomModel;
  classroom: any;
  currentClassroom: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  formSubmitAttempted: boolean = false;
  loading: boolean = false;
  teachers: any;
  user: any;
  templates: any;
  selectedThumbnailName: string = '';
  selectedHeaderPhotoName: string = '';
  thumbnailFile: File;
  headerPhotoFile: File;

 
  constructor(
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private teachersService: TeachersService,
    private authService: AuthService
  ) { }

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
    this.formGroup = this.formBuilder.group({
      name: [this.classroom?.name, [Validators.required]],
      template: [this.classroom?.template?.id, [Validators.required]],
      description: [this.classroom?.description, [Validators.required]],
      teacher: [this.classroom?.teacher?.id, [Validators.required]],
      header_photo: [this.classroom?.header_photo, [Validators.required]],
      thumbnail: [this.classroom?.thumbnail, [Validators.required]],
      active_term_start_date: [moment(this.classroom?.active_term_start_date).format('YYYY-MM-DD'), [Validators.required]],
      active_term_end_date: [moment(this.classroom?.active_term_end_date).format('YYYY-MM-DD'), [Validators.required]],
    });
  }

  // Get Classroom
  getClassroom() {
    this.classroomService
      .getClassroomById(this.currentClassroom.classroomId)
      .subscribe({
        next: (res: any) => {
          this.classroom = res.data.class;          
          this.initForm();
        },
        error: (e) => console.error(e),
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
    this.selectedThumbnailName = file.name;

    this.formGroup.patchValue({thumbnail: this.selectedThumbnailName}); 
    
  }

  uploadHeaderPhoto(event: any) {
    const file = event.target.files[0];
    this.headerPhotoFile = file;
    this.selectedHeaderPhotoName = file.name;
    this.formGroup.patchValue({header_photo: this.selectedHeaderPhotoName})
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

    this.classroomService.editClassroom(formData, this.currentClassroom.classroomId).subscribe(
      (res: any) => {
        // Show alert
        if (res.status === true) {
          this.alertMessage = res.message;
          this.showAlertPopup(res.message, 'success');
          // Set Timeout
          setTimeout(() => {
            this.router.navigate([`/school/classrooms/${this.currentClassroom.classroomId}/view-classroom`]);
          }, 3000);
        }

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.showAlertPopup(error.error.message, 'error');

        // Set loading to false
        this.loading = false;

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
