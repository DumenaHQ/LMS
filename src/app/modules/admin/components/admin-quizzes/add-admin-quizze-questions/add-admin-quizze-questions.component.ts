import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-admin-quizze-questions',
  templateUrl: './add-admin-quizze-questions.component.html',
  styleUrls: ['./add-admin-quizze-questions.component.scss']
})
export class AddAdminQuizzeQuestionsComponent implements OnInit {

  @Input() quizId: any;
  questionForm: FormGroup;
  loading: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
  ) {
    this.questionForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }
  ngOnInit(): void {
  }

  // Get Questions
  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  // Get Options
  getOptions(questionGroup: any): FormArray | null {
    return questionGroup.get('options') as FormArray;
  }

  // Add Question
  addQuestion() {
    const questionGroup = this.fb.group({
      question: '',
      selectionType: 'single',
      options: this.fb.array([]),
      correctAnswer: '',
    });
    this.questions.push(questionGroup);
  }

  // Remove Option
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  // Add Option
  addOption(questionGroup: any) {
    const options = questionGroup.get('options') as FormArray;
    options.push(this.fb.control(''));
  }

  // Remove Option
  removeOption(questionGroup: any, index: number) {
    const options = questionGroup.get('options') as FormArray;
    options.removeAt(index);
  }

  onSubmit() {
    this.loading = true;

    const remappedArray = this.questionForm.value.questions.map((item: any) => {
      const remappedItem: any = {
        "question": item.question,
      };

      const filteredOptions = item.options.filter((option: any) => option !== ""); // Remove empty options
      filteredOptions.forEach((option: any, index: any) => {
        remappedItem[`opt${String.fromCharCode(65 + index)}`] = option;

        if (option === item.correctAnswer) {
          remappedItem.answer = String.fromCharCode(65 + index);
        }
      });
    
      return remappedItem;
    });
    console.log(remappedArray);

    this.quizService.addQuestionsToQuiz(this.quizId, remappedArray).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');
          setTimeout(() => {
            window.location.reload();
          }, 6000);
        }
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.showAlertPopup(error.error.message, 'error');

        // Set loading to false
        this.loading = false;
      }
    );
  }

  // Get Alphabet Label
  getAlphabetLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  // Show alert
  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
  
}
