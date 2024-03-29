import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

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
  file: File;
  templates: any;
  teachers: any;
  isFormSubmitted: boolean = false;

  // previewImage: any;
  // showPreviewImage: boolean = false;

  constructor(
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      teacher: [''],
    });
  }

  // Get classroom templates
  getClassroomTemplates() {
    this.classroomService.getClassroomTemplates().subscribe({
      next: (res: any) => {
        this.templates = res.data.classTemplates;
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  // Get teachers
  getTeachers() {
    // this.classroomService.getClassroomTemplates().subscribe({
    //   next: (res: any) => {
    //     this.templates = res.data.classTemplates;
    //     console.log(res);
    //   },
    //   error: (e) => console.error(e),
    // });
  }

  // Upload File
  uploadThumbnail(event: any) {
    this.file = event.target.files[0] as File;
    // Set file name
    this.selectedThumbnailName = this.file.name;

    console.log(this.selectedThumbnailName);

    this.formGroup.patchValue({thumbnail: this.selectedThumbnailName})
    
  }

  // Upload File
  uploadHeaderPhoto(event: any) {
    this.file = event.target.files[0] as File;
    // Set file name
    this.selectedHeaderPhotoName = this.file.name;
    
    console.log(this.selectedHeaderPhotoName);
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

    // var formData: any = new FormData();
    // formData.append('name', value.name);
    // formData.append('description', value.description);
    // // formData.append('thumbnail', value.thumbnail);
    // // formData.append('header_photo', value.header_photo);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    //   console.log(pair)
    // }

    const { value } = this.formGroup

    let payload = {
      name: value.name,
      description: value.description,
      template: value.template,
      teacher_id: value.teacher,
    }

    // Send users data
    // this.classroomService.addClassroom(payload).subscribe(
    //   (res: any) => {
    //     console.log(res);

    //     // Show alert
    //     if (res.status === true) {
    //       this.showAlertPopup(res.message, 'success');
    //       setTimeout(() => {
    //         this.router.navigate(['school/classrooms']);
    //       }, 3000);
    //     }
        
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     // Show error message
    //     this.showAlertPopup(error.error.message, 'error');

    //     // Set loading to false
    //     this.loading = false;

    //     // Set Timeout
    //     // setTimeout(() => {
    //     //   this.showError = false
    //     // }, 3000);
    //   }
    // );
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
