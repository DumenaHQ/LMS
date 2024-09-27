import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-course-quiz-report',
  templateUrl: './view-course-quiz-report.component.html',
  styleUrls: ['./view-course-quiz-report.component.scss']
})
export class ViewCourseQuizReportComponent implements OnInit {

  @Input() classroomId: any;
  @Input() course: any;
  @Input() user: any;
  @Output() courseQuizResult = new EventEmitter<any>();
  quizResults$: Observable<any>;
  dataLoading: boolean;
  showErrorMessage: boolean = false;
  errorMessage: string;
  formGroup: FormGroup;
  modules: any;
  lessons: any;

  constructor(
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.modules = this.course.modules;
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      module: ['', [Validators.required]],
      lesson: ['', [Validators.required]],
    });
  }

  handleSelectChange(event: any, fieldName: string) {
    if (fieldName === 'module') {
      this.modules.forEach((item: any) => {
        if (item.id === event.target.value) {
          this.lessons = item.lessons;
        }
      })
    } 
    if(fieldName === 'lesson') {
      this.lessons.forEach((item: any) => {
        if (item.id === event.target.value) {
          this.getQuizResults(item.quiz_id);
        }
      })
    }
  }

  getQuizResults(quiz_id: string): void {
    if (!quiz_id) {
      this.displayError('No quiz available for this lesson');
      return;
    }
  
    this.resetErrorState();
    this.dataLoading = true;
  
    const quizResultsObservable = this.user.role === 'learner'
      ? this.quizService.getLearnerQuizResult(quiz_id, this.user.id)
      : this.classroomService.getQuizResultsByQuizId(this.classroomId, quiz_id);
  
    this.quizResults$ = quizResultsObservable;
    
    quizResultsObservable.subscribe({
      next: (res: any) => {
        this.dataLoading = false;
      },
      error: (e) => {
        this.handleQuizError(e);
      },
    });
  }
  
  displayError(message: string): void {
    this.showErrorMessage = true;
    this.errorMessage = message;
    this.dataLoading = false;
  }
  
  resetErrorState(): void {
    this.showErrorMessage = false;
    this.errorMessage = '';
  }
  
  handleQuizError(e: any): void {
    console.error(e);
    if (e.error?.message === `This Learner hasn't taken the quiz yet`) {
      this.displayError(`You've not taken the quiz yet`);
    } else {
      this.dataLoading = false;
    }
  }

  goBack() {
    this.courseQuizResult.emit();
  }

}
