import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { CoursesService } from 'src/app/services/courses.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-add-program-courses',
  templateUrl: './add-program-courses.component.html',
  styleUrls: ['./add-program-courses.component.scss']
})
export class AddProgramCoursesComponent implements OnInit {

  @Input() programId: string;
  @Output() addCourseToProgramModal: EventEmitter<any> = new EventEmitter();
  @Output() getProgram: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  selectedCourses: any[] = [];
  courses: any;
  dataLoading: boolean = true;
  courseName: string;

  constructor(
    private programsService: ProgramsService,
    private coursesService: CoursesService,
    private appAlertService: AppAlertService,
    private changeDectetorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }
  
  getCourses() {
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

    this.programsService
      .addCourseToProgram(payload, this.programId)
      .subscribe({
        next: (res: any) => {
          if (res.status === true) {
            this.appAlertService.showAlert(res.message, AlertType.Success);
            this.closeAddCourseToProgramModal();
            this.getProgram.emit();
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
  closeAddCourseToProgramModal() {
    this.addCourseToProgramModal.emit();
  }
}

