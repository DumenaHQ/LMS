import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassTemplateDetailModel } from '../display-admin-class-template/details-display-admin-class-template/interfaces/class-template.model';

@Component({
  selector: 'app-edit-admin-class-template',
  templateUrl: './edit-admin-class-template.component.html',
  styleUrls: ['./edit-admin-class-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAdminClassTemplateComponent implements OnInit {
  classTemplateForm: FormGroup;
  loading: boolean = false;
  classroomTemplate!: ClassTemplateDetailModel;
  currentClassParams!: Params;
  returnUrl = '';
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  isFormSubmitted: boolean = false;

  constructor(
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private changeDectetorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Get Current Program
    this.currentClassParams = this.activatedRoute.snapshot.params;

    // Get programs
    this.classroomService
      .getClassroomTemplateById(this.currentClassParams.classTemplateId)
      .subscribe({
        next: (res: any) => {
          this.classroomTemplate = res.data.classTemplate;
          // Program form
          this.classTemplateForm = this.formBuilder.group({
            title: [this.classroomTemplate.title, [Validators.required]],
            objectives: new FormArray([]),
          });
          this.addObjective();
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  get objectives() {
    return this.classTemplateForm.get('objectives') as FormArray;
  }

  addObjective() {
    this.objectives.push(new FormControl(''));
  }

  removeObjective(index: number) {
    this.objectives.removeAt(index);
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
      objectives: this.classTemplateForm.value.objectives.filter((obj: any) => obj !== ''),
    };

    // Send users data
    this.classroomService.updateClassroomTemplate(this.classroomTemplate, payload).subscribe(
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
