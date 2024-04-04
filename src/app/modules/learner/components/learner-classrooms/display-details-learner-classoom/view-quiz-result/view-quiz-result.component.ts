import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz-result',
  templateUrl: './view-quiz-result.component.html',
  styleUrls: ['./view-quiz-result.component.scss']
})
export class ViewQuizResultComponent implements OnInit {

  @Input() course: any;
  @Output() courseQuizResult = new EventEmitter<any>();
  quizResults$: Observable<any>;
  user: any;
  errorMessage: any = '';

  constructor(
    private quizService: QuizService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let userData = this.authService.getUser();
    this.user = userData.user;
    this.getQuizResults();
  }

  getQuizResults() {
    this.quizResults$ = this.quizService.getLearnerQuizResult(this.course.quiz_id, this.user.id);
    this.quizResults$.subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);        
        if(e.error.message = `This Learner hasn't taken the quiz yet`) {
          this.errorMessage = e.error.message;
        }
      },
    })
  }

  goBack() {
    this.courseQuizResult.emit();
  }

}
