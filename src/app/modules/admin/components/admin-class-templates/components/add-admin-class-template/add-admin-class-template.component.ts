import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-add-admin-class-template',
  templateUrl: './add-admin-class-template.component.html',
  styleUrls: ['./add-admin-class-template.component.scss']
})
export class AddAdminClassTemplateComponent implements OnInit {

  classTemplateForm: FormGroup;
  loading: boolean = false;
  returnUrl = '';
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  isFormSubmitted: boolean = false;

  constructor(
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Program form
    this.classTemplateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      syllabus: ['', [Validators.required]],
    });
  }

  // Create Class Template
  createClassTemplate() {
    // Set loading to true
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.classTemplateForm.invalid) {
      this.loading = false;

      return;
    }

    let payload = {
      title: this.classTemplateForm.value.title,
      syllabus: this.classTemplateForm.value.syllabus,
    }

    console.log(payload);
    

    // Send users data
    this.classroomService.addClassroomTemplate(payload).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');
          setTimeout(() => {
            this.router.navigate(['admin/class-templates']);
          }, 3000);
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
