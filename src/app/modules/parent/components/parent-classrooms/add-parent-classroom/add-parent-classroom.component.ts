import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-add-parent-classroom',
  templateUrl: './add-parent-classroom.component.html',
  styleUrls: ['./add-parent-classroom.component.scss']
})
export class AddParentClassroomComponent implements OnInit {

  classroomForm: FormGroup;
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
  isFormSubmitted: boolean = false;

  // previewImage: any;
  // showPreviewImage: boolean = false;

  constructor(
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Program form
    this.classroomForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      template: [''],
      thumbnail: [''],
      header_photo: [''],
    });

    this.getClassroomTemplates();
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

  // Upload File
  uploadThumbnail(event: any) {
    this.file = event.target.files[0] as File;
    // Set file name
    this.selectedThumbnailName = this.file.name;

    console.log(this.selectedThumbnailName);

    this.classroomForm.patchValue({thumbnail: this.selectedThumbnailName})
    
  }

  // Upload File
  uploadHeaderPhoto(event: any) {
    this.file = event.target.files[0] as File;
    // Set file name
    this.selectedHeaderPhotoName = this.file.name;
    
    console.log(this.selectedHeaderPhotoName);
    this.classroomForm.patchValue({header_photo: this.selectedHeaderPhotoName})

  }


  // Create program
  createClassroom() {
    this.loading = true;

    this.isFormSubmitted = true;

    if (this.classroomForm.invalid) {
      this.loading = false;

      return;
    }

    var formData: any = new FormData();
    formData.append('name', this.classroomForm.value.name);
    formData.append('description', this.classroomForm.value.description);
    
    this.classroomService.addClassroom(formData)
      .then(res => {
        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');
          setTimeout(() => {
            this.router.navigate(['parent/classrooms']);
          }, 3000);
        }
      })
      .catch(error => {
        console.log(error);
        this.showAlertPopup(error.error.message, 'error');
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
