import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-admin-quizze',
  templateUrl: './view-admin-quizze.component.html',
  styleUrls: ['./view-admin-quizze.component.scss']
})
export class ViewAdminQuizzeComponent implements OnInit {

  quiz: any;
  currentQuiz: any;
  isModuleLessons: boolean = false;
  questionLessons: any;
  questionIndex: number = 0;
  isAddQuiz: boolean = false;

  // sub: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService

  ) { }

  ngOnInit(): void {

    // Get Current Program
    this.currentQuiz = this.activatedRoute.snapshot.params;

    // Get Course
    this.quizService.getquizByQuizId(this.currentQuiz.quizId).subscribe({
      next: (res: any) => {
        this.quiz = res.data.quiz;
        console.log(this.quiz);
      },
      error: (e: any) => console.error(e),
      complete: () => {
        // this.dataLoading = false;
      },
    });
  }

  // Add quiz
  addQuiz() {
    this.isAddQuiz = true
  }

}
