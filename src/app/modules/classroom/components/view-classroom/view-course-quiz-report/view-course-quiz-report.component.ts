import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-course-quiz-report',
  templateUrl: './view-course-quiz-report.component.html',
  styleUrls: ['./view-course-quiz-report.component.scss']
})
export class ViewCourseQuizReportComponent implements OnInit {

  @Input() classroomId: any;
  @Input() course: any;
  @Input() user: any;
  @Output() courseQuizResult = new EventEmitter<any>();
  quizResults$: Observable<any>;
  dataLoading: boolean;
  errorMessage: any = '';

  constructor(
    private classroomService: ClassroomService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.getQuizResults();
  }

  getQuizResults() {
    this.dataLoading = true;
    if(this.user.role === 'learner') {
      this.quizResults$ = this.quizService.getLearnerQuizResult(this.course.quiz_id, this.user.id);
      this.quizResults$.subscribe({
        next: (res: any) => { },
        error: (e) => {
          console.error(e);        
          if(e.error.message = `This Learner hasn't taken the quiz yet`) {
            this.errorMessage = e.error.message;
          }
        },
        complete: () => {
          this.dataLoading = false;
        },
      })
    } else {
      this.quizResults$ = this.classroomService.getQuizResultsByQuizId(this.classroomId, this.course.quiz_id);
      this.quizResults$.subscribe({
        next: (res: any) => { },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      })
    }

  }

  goBack() {
    this.courseQuizResult.emit();
  }

}
