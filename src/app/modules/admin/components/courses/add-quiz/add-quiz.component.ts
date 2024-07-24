import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
export class AddQuizComponent implements OnInit {

  @Input() courseId: any;
  @Input() moduleId: any;
  @Input() lessonId: any;
  @Output() addQuizToCourseModal: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  dataLoading: boolean = true;
  quizName: string;
  modules: any;
  lessons: any;
  formGroup: any = FormGroup;
  tags: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private appAlertService: AppAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      tags: [''],
      settings: [''],
    });
  }

  // Add tags
  addTag() {
    const { value } = this.formGroup;
    if (value.tags !== '') {
      this.tags.push(value.tags);
    }
    this.formGroup.get('tags').setValue('');
  }
  // Remove tagsory
  removeTag(index: any) {
    this.tags.splice(index, 1);
  }

  // Add quiz to course
  addQuizToCourse() {
    this.loading = true;
    const { value } = this.formGroup;
    let payload = {
      course_id: this.courseId,
      module_id: this.moduleId,
      lesson_id: this.lessonId,
      title: value.title,
      tags: this.tags,
      settings: { show_correct_answers: value.settings || false },
    };

    this.quizService.addQuiz(payload).subscribe({
      next: (res: any) => {
        this.appAlertService.showAlert(res.message, AlertType.Success);
        this.router.navigate([`admin/courses/${this.courseId}/quiz/${res.data.quiz.id}/details`]);
      },
      error: (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.error.code == 400
          ? (error.error.error.errors[0].message)
          : (error.error.message),
          AlertType.Error
        );
        this.loading = false;
      }
    });
  }

  // Close Add Modal
  closeAddQuizToCourse() {
    this.addQuizToCourseModal.emit();
  }
 }
