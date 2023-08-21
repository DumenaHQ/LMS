import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-display-admin-quizzes',
  templateUrl: './display-admin-quizzes.component.html',
  styleUrls: ['./display-admin-quizzes.component.scss']
})
export class DisplayAdminQuizzesComponent implements OnInit {

  allquizzes: any;
  dataLoading: boolean = true;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getAllquizzes().subscribe({
      next: (res: any) => {
        this.allquizzes = res.data.quizzes;
        console.log(this.allquizzes);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

}
