import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-view-course-quiz-results',
  templateUrl: './view-course-quiz-results.component.html',
  styleUrls: ['./view-course-quiz-results.component.scss']
})
export class ViewCourseQuizResultsComponent implements OnInit {
  @Input() classroomId: any;
  @Input() course: any;
  quizResults$: Observable<any>;

  constructor(
    private classroomService: ClassroomService,
  ) { }

  ngOnInit(): void {
    this.getQuizResults();
  }

  getQuizResults() {
    this.quizResults$ = this.classroomService.getQuizResultsByQuizId(this.classroomId, this.course.quiz_id);
    this.quizResults$.subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    })
  }

}
