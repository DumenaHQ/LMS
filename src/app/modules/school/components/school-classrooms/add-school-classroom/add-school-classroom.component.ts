import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-add-school-classroom',
  templateUrl: './add-school-classroom.component.html',
  styleUrls: ['./add-school-classroom.component.scss']
})
export class AddSchoolClassroomComponent implements OnInit {

  formGroup: FormGroup;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  selectedThumbnailName: string = '';
  selectedHeaderPhotoName: string = '';
  thumbnailFile: File;
  headerPhotoFile: File;
  templates: any;
  teachers: any;
  isFormSubmitted: boolean = false;
  user: any;

  // previewImage: any;
  // showPreviewImage: boolean = false;

  constructor(
    private teachersService: TeachersService,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
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
      description: ['', [Validators.required]],
      template: [''],
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
    // Set loading to true
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.formGroup.invalid) {
      this.loading = false;

      return;
    }

    const { value } = this.formGroup;

    var formData: any = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('template', value.template);
    if (this.headerPhotoFile) {
      formData.append('header_photo', this.headerPhotoFile);
    }
    if (this.thumbnailFile) {
      formData.append('thumbnail', this.thumbnailFile);
    }

    this.classroomService.addClassroom(formData).subscribe(
      (res: any) => {
        // Show alert
        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');
          setTimeout(() => {
            this.router.navigate(['school/classrooms']);
          }, 3000);
        }
        
      },
      (error: any) => {
        console.log(error);
        // Show error message
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
