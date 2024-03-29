import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

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
 
  constructor(
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  // classroom form
  formGroup = this.formBuilder.group({
    name: [''],
    description: [''],
    teacher: [''],
  });

  ngOnInit(): void {
    // Get Current classroom
    this.currentClassroom = this.activatedRoute.snapshot.params;
    this.getClassroom();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.classroom.name],
      description: [this.classroom.description],
      teacher: [this.classroom.teacher],
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

  // Get Teachers
  getTeachers() {

  }

  editClassroom() {
    // Set loading to true
    this.loading = true;

    const { value } = this.formGroup

    let payload = {
      name: value.name,
      description: value.description,
      teacher_id: value.teacher
    }
      
    // Send users data
    this.classroomService.editClassroom(payload, this.currentClassroom.classroomId).subscribe(
      (res: any) => {
        console.log(res);

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
