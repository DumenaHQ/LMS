import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { LearningSupportService } from 'src/app/services/learning-support.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  @Input() courses: any;
  @Input() classroomId: any;
  @Input() programId: any;
  @Output() addQuestionModal: EventEmitter<any> = new EventEmitter();
  @Output() getQuestions: EventEmitter<any> = new EventEmitter();
  formGroup: FormGroup;
  loading: boolean = false;
  modules: any;
  lessons: any;
  lessonTitle: string;

  constructor(
    private learningSupportService: LearningSupportService,
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      course: ['', [Validators.required]],
      module: ['', [Validators.required]],
      lesson: ['', [Validators.required]],
      question: [''],
      note: [''],
    });
  }

  handleSelectChange(event: any, fieldName: string) {
    // event.target.value
    if (fieldName === 'course') {
      this.courses.forEach((item: any) => {
        if (item.id === event.target.value) {
          this.modules = item.modules;
        }
      })
    }
    if (fieldName === 'module') {
      this.modules.forEach((item: any) => {
        if (item.id === event.target.value) {
          this.lessons = item.lessons;
        }
      })
    }
    if (fieldName === 'lesson') {
      const selectElement = event.target as HTMLSelectElement;
      const selectedIndex = selectElement.selectedIndex;
      const selectedOption = selectElement.options[selectedIndex];
      this.lessonTitle = selectedOption.innerText;
    }
  }

  addQuestion() {
    this.loading = true;
    const { value } = this.formGroup;
    
    let payload: any = {
      question: value.question, 
      course_id: value.course,
      lesson: {
        title: this.lessonTitle,
        id: value.lesson
      }
    }
    
    if(this.classroomId) {
      payload.class_id = this.classroomId
    } else {
      payload.program_id = this.programId
    }
    
    this.learningSupportService.addQuestions(payload).subscribe({
      next:(res: any) => {
        if (res.status === true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.getQuestions.emit();
          this.closeAddQuestionModal();
        }
      },
      error: (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.message
            ? error.message
            : error.error
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
            AlertType.Error
          );
        this.loading = false;
      }
    });
  }

  // Close Add Modal
  closeAddQuestionModal() {
    this.addQuestionModal.emit();
  }
}
