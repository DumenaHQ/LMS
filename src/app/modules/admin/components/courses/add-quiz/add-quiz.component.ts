import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
export class AddQuizComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  // Add Quiz
  addQuiz() {
    let payload = {
      title: 'Basic JavaScript Quiz',
      tags: ['Tech', 'Coding'],
      settings: { show_correct_answers: true },
      course_id: '6325242af131b0a5f3e7c4ae',
    };

    this.quizService.addQuiz(payload).subscribe((res: any) => {
      console.log(res);
    });
  }

  // 632c7d1a9d741a71a69004bf

  addQuestions() {
    let payload = [
      {
        question: 'Is this true',
        optA: 'Yes',
        optB: 'No',
        answer: 'B',
      },
    ];
    console.log(payload);

    this.quizService
      .addQuestionsToQuiz('632c7d1a9d741a71a69004bf', payload)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
