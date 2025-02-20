import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { QuizService } from 'src/app/services/quiz.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-edit-quiz-question',
  templateUrl: './edit-quiz-question.component.html',
  styleUrls: ['./edit-quiz-question.component.scss']
})
export class EditQuizQuestionComponent implements OnInit {

  @Input() quizId: any;
  @Input() quizQuestion: any;
  @Input() quizQuestionIndex: any;
  @Output() editQuizQuestionModal = new EventEmitter<any>();
  formGroup: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private appAlertService: AppAlertService,
    private formErrorService: FormErrorMessageService
  ) { }
  ngOnInit(): void {
    this.initForm();  
  }

  initForm() {
    const options = Object.entries(this.quizQuestion || {})
    .filter(([label]) => label.startsWith('opt'))
    .map(([label, value]) => ({ label, value }));

    this.formGroup = this.fb.group({
      question: [this.quizQuestion?.question || '', [Validators.required]],
      selectionType: ['single', [Validators.required]],
      options: this.fb.array(
        options.length > 0
          ? options.map((opt: any) => this.createOption(opt.label, opt.value))
          : [this.createOption('optA', '')]
      ),
      correctAnswer: [this.quizQuestion?.answer || '', [Validators.required]],
    });
  }

  get options(): FormArray {
    return this.formGroup.get('options') as FormArray;
  }
  
  createOption(label: string, value: string): FormGroup {
    return this.fb.group({
      label: [label], // Fixed key for option identifier (e.g., optA, optB, etc.)
      value: [value, Validators.required], // Option value
    });
  }
  
  addOption(): void {
    const currentOptions = this.options.controls.length;
    const nextKey = `opt${String.fromCharCode(65 + currentOptions)}`; // Generate keys like optA, optB, ...
    this.options.push(this.createOption(nextKey, ''));
  }
  
  removeOption(index: number): void {
    this.options.removeAt(index);
    this.updateOptionLabels();
  }
  
  updateOptionLabels(): void {
    // Reassign option keys (e.g., optA, optB, etc.) to maintain order after removing options
    this.options.controls.forEach((control, index) => {
      control.patchValue({ label: `opt${this.getAlphabetLabel(index)}` });
    });
  }

  // Get Alphabet Label
  getAlphabetLabel(index: number): string {
    return String.fromCharCode(65 + index); // 65 is ASCII code for 'A'
  }
  
  setCorrectAnswer(answer: string): void {
    this.formGroup.patchValue({ correctAnswer: answer });
  }
  
  isCorrectAnswer(answer: string): boolean {
    return this.formGroup.get('correctAnswer')?.value === answer;
  }
  
  getPayload(): any {
    const question = this.formGroup.get('question')?.value || this.quizQuestion.question;
    const correctAnswer = this.formGroup.get('correctAnswer')?.value || this.quizQuestion.answer;

    const options = this.options.controls.reduce((acc: any, control: any) => {
      const { label, value } = control.value;
      acc[label] = value; // Maintain key-value structure
      return acc;
    }, {});

    return {
      question,
      ...options,
      answer: correctAnswer,
    };
  }

  onSubmit() {
    this.loading = true;
    const payload = this.getPayload();
    
    this.quizService.updateQuestionsToQuiz(this.quizId, this.quizQuestion.id, payload).subscribe(
      (res: any) => {
        if (res.status) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.closeAddQuizQuestions();
        }
      },
      (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.message
          ? (error.error.message)
          : (error.error.error.errors[0].message),
          AlertType.Error
        );

        // Set loading to false
        this.loading = false;
      }
    );
  }

  getErrorMessage(controlName: string, labelName: string, optionIndex?: number): string {
    let control: AbstractControl | null = null;
    if(optionIndex) {
      const optionsArray = this.formGroup.get('options') as FormArray;
      const optionGroup = optionsArray.at(optionIndex) as FormGroup;
      control = optionGroup.get(controlName);
    } else {
      control = this.formGroup.get(controlName);
    }
    const errors = control?.errors;
    return this.formErrorService.getErrorMessage(errors, labelName);
  }

  closeAddQuizQuestions() {
    this.editQuizQuestionModal.emit();
  }

}
