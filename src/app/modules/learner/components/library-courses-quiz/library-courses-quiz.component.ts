import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-library-courses-quiz',
  templateUrl: './library-courses-quiz.component.html',
  styleUrls: ['./library-courses-quiz.component.scss']
})
export class LibraryCoursesQuizComponent implements OnInit {
  currentCourseParams: any;
  course: any;
  quiz: any;
  currentQuestionIndex: number = 0;
  responses: { question_id: string, selected_ans: string }[] = [];

  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  isSubmitQuiz: boolean = false;
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private quizzesService: QuizService,
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

  // Get question Index
  // Get Module lessons
  getQuestionIndex(questionIndex: number) {
    this.currentQuestionIndex = questionIndex;    
  }

  // Next question
  nextQuestion() {
    this.currentQuestionIndex++;
  }

  // Previous question
  previousQuestion() {
    this.currentQuestionIndex--;
  }

  // Select answer
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

  // Open confirm submit modal
  openConfirmSubmitModal() {
    // Show confirm submit modal
    this.isSubmitQuiz = true;
  }

  // Submit quiz
  submitQuiz() {
    this.loading = true; 

    this.quizzesService.submitQuiz(this.currentCourseParams.quizId, this.responses).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');
          setTimeout(() => {
            this.router.navigate([`learner/library/${this.currentCourseParams.courseId}/${this.currentCourseParams.lessonId}`]);
          }, 3000);
        }
        
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.showAlertPopup(error.error.message, 'error');

        // Set loading to false
        this.loading = false;

        // Set Timeout
        // setTimeout(() => {
        //   this.showError = false
        // }, 3000);
      }
    );
  }

  // Go back
  goToLibrary() {
    window.history.back();
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
