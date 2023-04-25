import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-program-create',
  templateUrl: './program-create.component.html',
  styleUrls: ['./program-create.component.scss'],
})
export class ProgramCreateComponent implements OnInit {
  programForm: FormGroup;
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
    private programsService: ProgramsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Program form
    this.programForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      header_photo: ['', [Validators.required]],
    });
  }

  // Upload File
  uploadThumbnail(event: any) {
    this.file = event.target.files[0] as File;
    // Set file name
    this.selectedThumbnailName = this.file.name;

    console.log(this.selectedThumbnailName);

    this.programForm.patchValue({thumbnail: this.selectedThumbnailName})
    
  }

  // Upload File
  uploadHeaderPhoto(event: any) {
    this.file = event.target.files[0] as File;
    // Set file name
    this.selectedHeaderPhotoName = this.file.name;
    
    console.log(this.selectedHeaderPhotoName);
    this.programForm.patchValue({header_photo: this.selectedHeaderPhotoName})

  }


  // Create program
  createProgram() {
    // Set loading to true
    this.loading = true;

    var formData: any = new FormData();
    formData.append('name', this.programForm.value.name);
    formData.append('description', this.programForm.value.description);
    formData.append('thumbnail', this.programForm.value.thumbnail);
    formData.append('header_photo', this.programForm.value.header_photo);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
      console.log(pair)
    }
    

    // Send users data
    this.programsService.addProgram(formData).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.alertMessage = res.message;
          this.showAlertPopup(res.message, 'success');
        }
        
        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.showAlertPopup(error.error.message, 'success');

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
