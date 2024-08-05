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
  errorMessage: boolean = false;
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

  getQuizResults(quiz_id: string) {
    if(quiz_id === undefined) {
      this.errorMessage = true;
    } else {
      this.errorMessage = false;
      this.dataLoading = true;
      if(this.user.role === 'learner') {
        this.quizResults$ = this.quizService.getLearnerQuizResult(quiz_id, this.user.id);
        this.quizResults$.subscribe({
          next: (res: any) => { },
          error: (e) => {
            console.error(e);        
            if(e.error.message = `This Learner hasn't taken the quiz yet`) {
              this.errorMessage = true;
            }
          },
          complete: () => {
            this.dataLoading = false;
          },
        })
      } else {
        this.quizResults$ = this.classroomService.getQuizResultsByQuizId(this.classroomId, quiz_id);
        this.quizResults$.subscribe({
          next: (res: any) => { },
          error: (e) => console.error(e),
          complete: () => {
            this.dataLoading = false;
          },
        })
      }
    }
  }

  goBack() {
    this.courseQuizResult.emit();
  }

}
