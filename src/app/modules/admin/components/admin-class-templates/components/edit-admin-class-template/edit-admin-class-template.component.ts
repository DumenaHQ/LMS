import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-edit-admin-class-template',
  templateUrl: './edit-admin-class-template.component.html',
  styleUrls: ['./edit-admin-class-template.component.scss']
})
export class EditAdminClassTemplateComponent implements OnInit {

  classTemplate: any;
  currentClassTemplateId: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  loading: boolean = false;
 
  constructor(
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  // classroom form
  classTemplateForm = this.formBuilder.group({
    title: [''],
    syllabus: [''],
  });

  ngOnInit(): void {
    // Get Current classroom template
    this.currentClassTemplateId = this.activatedRoute.snapshot.params;

    // Get classroom Template by Id
    this.classroomService
      .getClassroomTemplateById(this.currentClassTemplateId.classTemplateId)
      .subscribe({
        next: (res: any) => {
          this.classTemplate = res.data.classTemplate;
          
          this.initForm();
        },
        error: (e) => console.error(e),
      });

  }

  // Initialize form
  initForm() {
    // classroom form
    this.classTemplateForm = this.formBuilder.group({
      title: [this.classTemplate.title],
      syllabus: [this.classTemplate.syllabus],
    });
  }

  editClassroom() {
    // Set loading to true
    this.loading = true;

    let payload = {
      title: this.classTemplateForm.value.title,
      syllabus: this.classTemplateForm.value.syllabus
    }

    // Send users data
    this.classroomService.editClassroomTemplate(payload, this.currentClassTemplateId.classTemplateId).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.alertMessage = res.message;
          this.showAlertPopup(res.message, 'success');
          // Set Timeout
          setTimeout(() => {
            this.router.navigate([`/admin/class-templates/${this.currentClassTemplateId.classTemplateId}/view-class-template`]);
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

