import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course-admin-class-template',
  templateUrl: './add-course-admin-class-template.component.html',
  styleUrls: ['./add-course-admin-class-template.component.scss']
})
export class AddCourseAdminClassTemplateComponent implements OnInit {

  @Input() templateId: string;
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

  // Add Courses to classroom Template
  addCourseToProgram() {
    // Set loading to true
    this.loading = true;

    let payload = {
      courses: this.selectedCourses,
    };

    this.classroomService
      .addCourseToClassroomTemplate(payload, this.templateId)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.status === true) {
            this.showAlertPopup(res.message, 'success');
            // close modal
            setTimeout(() => {
              this.closeAddCourseToTemplateModal();

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

  // Close Add Course to Template Modal
  closeAddCourseToTemplateModal() {
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

