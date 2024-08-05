import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  quiz: any;
  currentQuizParmas: any;
  questionIndex: number = 0;
  isAddQuizQuestions: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentQuizParmas = this.activatedRoute.snapshot.params;
    this.getQuizByQuizId();
  }
  
  getQuizByQuizId() {
    this.quizService.getquizByQuizId(this.currentQuizParmas.quizId).subscribe({
      next: (res: any) => {
        this.quiz = res.data.quiz;
        console.log(this.quiz);
      },
      error: (e: any) => console.error(e)
    });
  }

  toggleAddQuizQuestions() {
    this.isAddQuizQuestions = !this.isAddQuizQuestions;
  }

  closeAndRefresh() {
    this.isAddQuizQuestions = false;
    this.getQuizByQuizId();
  }

  getOptions(question: any): { label: string, value: string }[] {
    if (!question) {
      return [];
    }
    const options: { label: string; value: any; }[] = [];
    const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    optionLabels.forEach(label => {
      const optionKey = `opt${label}`;
      if (question[optionKey]) {
        options.push({ label, value: question[optionKey] });
      }
    });
  
    return options;
  }

  navigatePage() {
    this.router.navigate([`admin/courses/${this.currentQuizParmas.courseId}/details`]);
  }

}

