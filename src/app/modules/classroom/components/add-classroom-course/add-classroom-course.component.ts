import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-classroom-course',
  templateUrl: './add-classroom-course.component.html',
  styleUrls: ['./add-classroom-course.component.scss']
})
export class AddClassroomCourseComponent implements OnInit {

  @Input() classroomId: string;
  @Output() addCourseToClassroomModal: EventEmitter<any> = new EventEmitter();
  @Output() getClassroom: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  selectedCourses: any[] = [];
  courses: any;
  dataLoading: boolean = true;
  courseName: string;


  constructor(
    private classroomService: ClassroomService,
    private coursesService: CoursesService,
    private changeDectetorRef: ChangeDetectorRef,
    private appAlertService: AppAlertService,
  ) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (res: any) => {
        this.courses = res.data.courses;
        console.log(this.courses);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Search students
  search() {
    if (this.courseName != "") {
      this.courses = this.courses.filter((res: any) => {
        return res.title.toLocaleLowerCase().match(this.courseName.toLocaleLowerCase());
      });
    } else if (this.courseName == "") {
      this.ngOnInit()
    }
  }

  // Select students (School)
  selectCourse(event: any, course: any) {

    // If doesn't exist add new student
    if(event.target.checked === false) {
      this.selectedCourses.forEach((element: any, index: any) => {
          if(element.username === course.username) {
            this.selectedCourses.splice(index, 1)
          }
          return this.selectedCourses
        });
      }
      else {
        this.selectedCourses.push(course.id);
      }
      
  }

  // Add learners to classroom
  addCourseToProgram() {
    this.loading = true;

    let payload = {
      courses: this.selectedCourses,
    };

    this.classroomService
      .addCourseToClassroom(payload, this.classroomId)
      .subscribe({
        next: (res: any) => {
          if (res.status === true) {
            this.appAlertService.showAlert(res.message, AlertType.Success);
            this.closeAddCourseToClassroomModal();
            this.getClassroom.emit();
          }
        },
        error: (error) => {
          console.error(error);
          this.appAlertService.showAlert(
            error.error.message
              ? error.error.message
              : error.message
              ? error.error.message || error.error.error.errors[0].message
              : error.message,
            AlertType.Error
          );
          this.loading = false;
        },
      });
  }

  // Close Add Modal
  closeAddCourseToClassroomModal() {
    this.addCourseToClassroomModal.emit();
  }

}
