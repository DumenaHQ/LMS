import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-school-classroom-courses',
  templateUrl: './add-school-classroom-courses.component.html',
  styleUrls: ['./add-school-classroom-courses.component.scss']
})
export class AddSchoolClassroomCoursesComponent implements OnInit {

  @Input() classroomId: string;
  @Output() addCourseToClassroomModal: EventEmitter<any> = new EventEmitter();
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  loading: boolean = false;
  selectedCourses: any[] = [];
  courses: any;
  dataLoading: boolean = true;
  courseName: string;


  constructor(
    private classroomService: ClassroomService,
    private coursesService: CoursesService,
    private changeDectetorRef: ChangeDetectorRef
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
    // Set loading to true
    this.loading = true;

    let payload = {
      courses: this.selectedCourses,
    };

    console.log(payload);
    

    this.classroomService
      .addCourseToClassroom(payload, this.classroomId)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.status === true) {
            this.showAlertPopup(res.message, 'success');
            // close modal
            setTimeout(() => {
              this.closeAddCourseToClassroomModal();

              window.location.reload();
              // this.changeDectetorRef.detectChanges();
            }, 3000);
          }
        },
        error: (e) => {
          console.error(e)
          this.showAlertPopup(e.error.message, 'error');

          this.loading = false;
        },
      });
  }

  // Close Add Modal
  closeAddCourseToClassroomModal() {
    this.addCourseToClassroomModal.emit();
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
