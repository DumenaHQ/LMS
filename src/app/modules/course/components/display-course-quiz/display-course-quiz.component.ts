import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-display-course-quiz',
  templateUrl: './display-course-quiz.component.html',
  styleUrls: ['./display-course-quiz.component.scss']
})
export class DisplayCourseQuizComponent implements OnInit {

  currentCourseParams: any;
  course: any;
  quiz: any;
  currentQuestionIndex: number = 0;
  responses: { question_id: string, selected_ans: string }[] = [];
  isSubmitQuiz: boolean = false;
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizzesService: QuizService,
    private appAlertService: AppAlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentCourseParams = this.activatedRoute.snapshot.params;
    this.getQuizByQuizId(this.currentCourseParams.quizId);
  }

  // Get quiz by quiz Id
  getQuizByQuizId(quizId: any) {
    this.quizzesService
      .getquizByQuizId(quizId)
      .subscribe((res: any) => {
        console.log(res);
        this.quiz = res.data.quiz;
      });
  }

  getQuestionIndex(questionIndex: number) {
    this.currentQuestionIndex = questionIndex;    
  }

  nextQuestion() {
    this.currentQuestionIndex++;
  }

  previousQuestion() {
    this.currentQuestionIndex--;
  }

  selectAnswer(questionId: string, selectedAnswer: string) {
    // Check if the response for this question already exists
    const index = this.responses.findIndex(response => response.question_id === questionId);

    if (index !== -1) {
      // If the response already exists and it's the same as the selected answer, remove it
      if (this.responses[index].selected_ans === selectedAnswer) {
        this.responses.splice(index, 1);
      } else {
        // If the response exists but it's a different answer, update the selected answer
        this.responses[index].selected_ans = selectedAnswer;
      }
    } else {
      // If the response doesn't exist, add a new response
      this.responses.push({ question_id: questionId, selected_ans: selectedAnswer });
    }
  }

  // Check if an option is selected
  isOptionSelected(option: string, questionId: string): any {
    // Check if the option is selected for the given questionId
    const response = this.responses.find(response => response.question_id === questionId);
    
    return response && response.selected_ans === option;
  }

  openConfirmSubmitModal() {
    this.isSubmitQuiz = true;
  }

  submitQuiz() {
    this.loading = true; 

    this.quizzesService.submitQuiz(this.currentCourseParams.quizId, this.responses).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.goBackToCourse();
        }     
      },
      (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.message
            ? error.error.message
            : error.message
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
          AlertType.Error
        );
        this.loading = false;
      }
    );
  }

  goBackToCourse() {
    this.router.navigate([`learner/classrooms/courses/${this.currentCourseParams.courseId}/lessons`]);
  }

}
