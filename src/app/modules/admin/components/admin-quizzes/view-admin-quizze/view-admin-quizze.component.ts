import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-admin-quizze',
  templateUrl: './view-admin-quizze.component.html',
  styleUrls: ['./view-admin-quizze.component.scss']
})
export class ViewAdminQuizzeComponent implements OnInit {

  quiz: any;
  currentQuiz: any;
  questionIndex: number = 0;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.currentQuiz = this.activatedRoute.snapshot.params;
    this.getQuizByQuizId();
  }
  
  getQuizByQuizId() {
    this.quizService.getquizByQuizId(this.currentQuiz.quizId).subscribe({
      next: (res: any) => {
        this.quiz = res.data.quiz;
        console.log(this.quiz);
      },
      error: (e: any) => console.error(e)
    });
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

}
