import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-to-class-modal.component.html',
  styleUrls: ['./add-course-to-class-modal.component.scss']
})
export class AddCourseModalToClassComponent implements OnInit {

  @Input() classId: string;
  @Output() addCourseToProgramModal: EventEmitter<any> = new EventEmitter();
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

  // Add learners to program (select and single enrollment)
  addCourseToProgram() {
    // Set loading to true
    this.loading = true;

    let payload = {
      courses: this.selectedCourses,
    };

    this.classroomService
      .addCourseToClassroom(payload, this.classId)
      .subscribe({
        next: (res: any) => {
          if (res.status === true) {
            this.showAlertPopup(res.message, 'success');
            // close modal
            setTimeout(() => {
              this.closeAddCourseToProgramModal()

              window.location.reload()
              // this.changeDectetorRef.detectChanges();
            }, 3000);
          }
        },
        error: (e) => {
          console.error(e)
          this.showAlertPopup(e.error.message, 'error');

          this.loading = false
        },
      });
  }

  // Close Add Modal
  closeAddCourseToProgramModal() {
    this.addCourseToProgramModal.emit();
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
