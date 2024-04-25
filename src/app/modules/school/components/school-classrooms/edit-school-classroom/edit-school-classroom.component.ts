import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-edit-school-classroom',
  templateUrl: './edit-school-classroom.component.html',
  styleUrls: ['./edit-school-classroom.component.scss']
})
export class EditSchoolClassroomComponent implements OnInit {

  classroom: any;
  currentClassroom: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
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
      name: [this.classroom?.name ],
      template: [this.classroom?.template?.id],
      description: [this.classroom?.description],
      teacher: [this.classroom?.teacher?.id],
      header_photo: [this.classroom?.header_photo],
      thumbnail: [this.classroom?.thumbnail],
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
    // Set loading to true
    this.loading = true;

    const { value } = this.formGroup;

    var formData: any = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('template', value.template);
    formData.append('teacher_id', value.teacher);
    if (this.headerPhotoFile) {
      formData.append('header_photo', this.headerPhotoFile);
    }
    if (this.thumbnailFile) {
      formData.append('thumbnail', this.thumbnailFile);
    }

    this.classroomService.editClassroom(formData, this.currentClassroom.classroomId)
      .then(res => {
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
      })
      .catch(error => {
        console.log(error);
        // Show error message
        this.showAlertPopup(error.error.message, 'error');

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
