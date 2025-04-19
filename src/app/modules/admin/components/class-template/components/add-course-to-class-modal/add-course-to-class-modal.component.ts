import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
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
  loading: boolean = false;
  selectedTermCourses: any[] = [];
  courses: any;
  dataLoading: boolean = true;
  courseName: string;
  selectedTerm: string = '1st term';


  constructor(
    private classroomService: ClassroomService,
    private coursesService: CoursesService,
    private appAlertService: AppAlertService,
  ) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (res: any) => {
        this.courses = res.data.courses;
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

  handleSelectChange(event: any) {
    this.selectedTerm = event.target.value;    
  }

  selectCourse(event: any, course: any) {
    const term = this.selectedTerm;
    // Find existing term object
    const termObj = this.selectedTermCourses.find((t: any) => t.term === term);
    if (event.target.checked === false) {
      if (termObj) {
        // Remove the course ID from the term's courses array
        termObj.courses = termObj.courses.filter((id: any) => id !== course.id);
        // Remove the term object if no courses are left
        if (termObj.courses.length === 0) {
          this.selectedTermCourses = this.selectedTermCourses.filter((t: any) => t.term !== term);
        }
      }
    } else {
      if (termObj) {
        // Avoid duplicates
        if (!termObj.courses.includes(course.id)) {
          termObj.courses.push(course.id);
        }
      } else {
        // Term doesn't exist yet — create new entry
        this.selectedTermCourses.push({
          term: term,
          courses: [course.id]
        });
      }
    }
  }

  isCourseChecked(courseId: string): boolean {
    const termObj = this.selectedTermCourses.find((t: any) => t.term === this.selectedTerm);
    return termObj ? termObj.courses.includes(courseId) : false;
  }
  

  addCourseToProgram() {
    this.loading = true;

    let payload = {
      term_courses: this.selectedTermCourses,
    };
    
    this.classroomService
      .addCourseToClassroomTemplateTerms(payload, this.classId)
      .subscribe({
        next: (res: any) => {
          if (res.status === true) {
            this.appAlertService.showAlert(res.message, AlertType.Success);
            setTimeout(() => {
              this.closeAddCourseToProgramModal();
              window.location.reload();
            }, 3000);
          }
        },
        error: (error) => {
          console.error(error)
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

  closeAddCourseToProgramModal() {
    this.addCourseToProgramModal.emit();
  }

}
