import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { LearningSupportService } from 'src/app/services/learning-support.service';

@Component({
  selector: 'app-add-question-comment',
  templateUrl: './add-question-comment.component.html',
  styleUrls: ['./add-question-comment.component.scss']
})
export class AddQuestionCommentComponent implements OnInit {

  @Input() questionId: any;
  @Output() getComments: EventEmitter<any> = new EventEmitter();
  formGroup: FormGroup;
  loading: boolean = false;
  errorMessage: boolean = false;
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
      comment: ['', Validators.required],
    });
  }

  addQuestion() {
    if (this.formGroup.invalid) {
      this.errorMessage = true;
      return;
    }
    this.loading = true;
    const { value } = this.formGroup;
    
    let payload = {
      comment: value.comment,
    } 

    this.learningSupportService.addCommentToQuestion(payload, this.questionId).subscribe({
      next:(res: any) => {
        if (res.status === true) {
          this.errorMessage = false;
          this.loading = false;
          this.formGroup.reset();
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.getComments.emit();
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
        this.errorMessage = false;
      }
    });
  }

}
