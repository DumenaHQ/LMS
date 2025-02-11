import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { QuizService } from 'src/app/services/quiz.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-add-quiz-questions',
  templateUrl: './add-quiz-questions.component.html',
  styleUrls: ['./add-quiz-questions.component.scss']
})
export class AddQuizQuestionsComponent implements OnInit {


  @Input() quizId: any;
  @Input() quizQuestionCount: number;
  @Output() addQuizQuestionModal = new EventEmitter<any>();
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
    this.formGroup = this.fb.group({
      questions: this.fb.array([
        this.createQuestionGroup(),
      ]),
    });
  }

  // Get Questions
  get questions(): FormArray {
    return this.formGroup.get('questions') as FormArray;
  }

  createQuestionGroup(): FormGroup {
    const optionsArray = this.fb.array([
      this.createOption('optionA')
    ]);
    return this.fb.group({
      question: ['', [Validators.required]],
      selectionType: ['single', [Validators.required]],
      options: optionsArray,
      correctAnswer: ['', [Validators.required]],
    });
  }

  // Add new question
  addNewQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  // Remove Option
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  // Get Options
  getOptions(questionGroup: any): FormArray | null {
    return questionGroup.get('options') as FormArray;
  }

  createOption(label: string): FormGroup {
    return this.fb.group({
      [label]: ['', [Validators.required]]
    });
  }

  // Add Option
  addOption(questionGroup: any) {
    const options = questionGroup.get('options') as FormArray;
    const nextLabel = `option${String.fromCharCode(65 + options.length)}`; // A, B, C, ...
    options.push(this.createOption(nextLabel));
  }

  // Remove Option
  removeOption(questionGroup: any, index: number) {
    const options = questionGroup.get('options') as FormArray;
    options.removeAt(index);
    this.updateOptionLabels(questionGroup);
  }

  updateOptionLabels(questionGroup: FormGroup): void {
    const options = this.getOptions(questionGroup);
    if (options) {
      options.controls.forEach((control: AbstractControl, index: number) => {
        const optionGroup = control as FormGroup;
        const optionLabel = this.getAlphabetLabel(index);
        const keys = Object.keys(optionGroup.controls);
        keys.forEach(key => {
          const controlValue = optionGroup.get(key)?.value;
          optionGroup.removeControl(key);
          optionGroup.addControl(`option${optionLabel}`, this.fb.control(controlValue, Validators.required));
        });
      });
    }
  }

  getOptionLabel(option: AbstractControl): string {
    return Object.keys(option.value)[0];
  }

  setCorrectAnswer(questionIndex: number, answer: string): void {
    const questionFormGroup = this.questions.at(questionIndex) as FormGroup;
    questionFormGroup.patchValue({ correctAnswer: answer });
  }
  
  isCorrectAnswer(questionIndex: number, answer: string): boolean {
    const questionFormGroup = this.questions.at(questionIndex) as FormGroup;
    return questionFormGroup.get('correctAnswer')?.value === answer;
  }

  getPayload(): any[] {
    return this.questions.controls.map((control: AbstractControl) => {
      const questionGroup = control as FormGroup;
      const question = questionGroup.get('question')?.value;
      const correctAnswer = questionGroup.get('correctAnswer')?.value;
      const optionsFormArray = questionGroup.get('options') as FormArray;
      const options: { [key: string]: string } = {};
  
      optionsFormArray.controls.forEach((control: AbstractControl, index: number) => {
        const optionGroup = control as FormGroup;
        const optionLabel = this.getAlphabetLabel(index);
        const optionValue = optionGroup.get(`option${optionLabel}`)?.value;
        options[`opt${optionLabel}`] = optionValue;
      });
  
      return {
        question,
        ...options,
        answer: correctAnswer
      };
    });
  }

  onSubmit() {
    this.loading = true;
    const payload = this.getPayload();
    this.quizService.addQuestionsToQuiz(this.quizId, payload).subscribe(
      (res: any) => {
        if (res.status === true) {
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

  getErrorMessage(questionIndex: number, optionIndex: number, controlName: string, labelName: string): string {
    const questionFormGroup = this.questions.at(questionIndex) as FormGroup;
    let control: AbstractControl | null = null;
    if (optionIndex === -1) {
      control = questionFormGroup.get(controlName);
    } else {
      const optionsArray = questionFormGroup.get('options') as FormArray;
      const optionGroup = optionsArray.at(optionIndex) as FormGroup;
      control = optionGroup.get(controlName);
    }
    const errors = control?.errors;
    return this.formErrorService.getErrorMessage(errors, labelName);
  }

  // Get Alphabet Label
  getAlphabetLabel(index: number): string {
    return String.fromCharCode(65 + index); // 65 is ASCII code for 'A'
  }

  closeAddQuizQuestions() {
    this.addQuizQuestionModal.emit();
  }
  
}

