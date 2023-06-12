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
      thumbnail: [''],
      header_photo: [''],
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
    // Set loading to true
    this.loading = true;

    // var formData: any = new FormData();
    // formData.append('name', this.classroomForm.value.name);
    // formData.append('description', this.classroomForm.value.description);
    // // formData.append('thumbnail', this.classroomForm.value.thumbnail);
    // // formData.append('header_photo', this.classroomForm.value.header_photo);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    //   console.log(pair)
    // }

    let payload = {
      name: this.classroomForm.value.name,
      description: this.classroomForm.value.description
    }
    
    

    // Send users data
    this.classroomService.addClassroom(payload).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');
          // setTimeout(() => {
          //   this.router.navigate(['admin/programs']);
          // }, 3000);
        }
        
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.showAlertPopup(error.error.message, 'error');

        // Set loading to false
        this.loading = false;

        // Set Timeout
        // setTimeout(() => {
        //   this.showError = false
        // }, 3000);
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
