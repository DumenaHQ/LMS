import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-view-quiz-result',
  templateUrl: './view-quiz-result.component.html',
  styleUrls: ['./view-quiz-result.component.scss']
})
export class ViewQuizResultComponent implements OnInit {

  @Input() classroomId: any;
  @Input() course: any;
  @Output() courseQuizResult = new EventEmitter<any>();
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

  goBack() {
    this.courseQuizResult.emit();
  }

}
