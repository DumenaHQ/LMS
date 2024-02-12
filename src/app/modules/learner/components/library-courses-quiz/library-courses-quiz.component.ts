import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private quizzesService: QuizService,
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

  // Go back
  goToLibrary() {
    window.history.back();
  }

}
