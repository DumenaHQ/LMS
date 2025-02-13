import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  quiz: any;
  activeParams: any;
  questionIndex: number = 0;
  isAddQuizQuestion: boolean = false;
  isEditQuizQuestion: boolean = false;
  quizQuestion: any;
  confirmModal: boolean = false;
  confirmMessage: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private appAlertService: AppAlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeParams = this.activatedRoute.snapshot.params;
    this.getQuizByQuizId();
  }
  
  getQuizByQuizId() {
    this.quizService.getquizByQuizId(this.activeParams.quizId).subscribe({
      next: (res: any) => {
        this.quiz = res.data.quiz;
      },
      error: (e: any) => console.error(e)
    });
  }

  toggleAddQuizQuestions() {
    this.isAddQuizQuestion = !this.isAddQuizQuestion;
  }

  closeAndRefresh() {
    this.isAddQuizQuestion = false;
    this.isEditQuizQuestion = false;
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

  editQuestion(question: any) {
    this.quizQuestion = question;
    this.isEditQuizQuestion = true;
  }

  // removeQuestion(question: any) {
  //   console.log(question);
    
  // }

  navigatePage() {
    this.router.navigate([`admin/courses/${this.activeParams.courseId}/details`]);
  }

  openConfirmModal() {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to remove quiz from ${this.activeParams.lessonName}?`;
  }

  removeQuiz() {
    let data = {
      course_id: this.activeParams.courseId,
      module_id: this.activeParams.moduleId,
      lesson_id: this.activeParams.lessonId,
      quiz_level: 'lesson'
    }

    this.quizService
      .removeQuizFromLesson(this.activeParams.quizId, data)
      .subscribe({
        next: (res: any) => {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.navigatePage();
        },
        error: (error: any) => {
          console.log(error);
          this.appAlertService.showAlert(
            error.error.error.code == 400
            ? (error.error.error.errors[0].message)
            : (error.error.message),
            AlertType.Error
          );
        }
      });
  }
  
  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }

}

