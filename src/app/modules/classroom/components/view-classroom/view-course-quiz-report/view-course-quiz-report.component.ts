import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-view-course-quiz-report',
  templateUrl: './view-course-quiz-report.component.html',
  styleUrls: ['./view-course-quiz-report.component.scss']
})
export class ViewCourseQuizReportComponent implements OnInit {

  @Input() classroomId: any;
  @Input() course: any;
  @Output() courseQuizResult = new EventEmitter<any>();
  quizResults$: Observable<any>;
  dataLoading: boolean;

  constructor(
    private classroomService: ClassroomService,
  ) { }

  ngOnInit(): void {
    this.getQuizResults();
  }

  getQuizResults() {
    this.dataLoading = true;
    this.quizResults$ = this.classroomService.getQuizResultsByQuizId(this.classroomId, this.course.quiz_id);
    this.quizResults$.subscribe({
      next: (res: any) => {
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    })
  }

  goBack() {
    this.courseQuizResult.emit();
  }

}
