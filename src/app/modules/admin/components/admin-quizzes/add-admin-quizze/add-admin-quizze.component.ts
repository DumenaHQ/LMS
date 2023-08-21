import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-admin-quizze',
  templateUrl: './add-admin-quizze.component.html',
  styleUrls: ['./add-admin-quizze.component.scss']
})
export class AddAdminQuizzeComponent implements OnInit {

  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  isTags: any;
  isTagsList: boolean = false
  tagsList: any[] = [];
  quizForm: any = FormGroup;
  loading: boolean = false;

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      tags: [''],
      settings: [''],
    });
  }

  // Add tags
  addTag() {
    const { value } = this.quizForm;
    // Show added tagsory(s)
    if (value.tags !== '') {
      // Show added email(s)
      this.isTagsList = true;
      this.tagsList.push(value.tags);
    }
    // Clear input field
    this.quizForm.get('tags').setValue('');
    
  }
  // Remove tagsory
  removeTag(index: any) {
    this.tagsList.splice(index, 1);
  }

  // Add Quiz
  addQuiz() {
    // Set loading to true
    this.loading = true;
    
    const { value } = this.quizForm;

    let payload = {
      title: value.title,
      tags: this.tagsList,
      settings: { show_correct_answers: value.settings },
    };
    

    this.quizService.addQuiz(payload).subscribe(
      (res: any) => {
        this.showAlertPopup(res.message, 'success')

        setTimeout(() => {
          this.router.navigate([`admin/quizzes`])
        }, 3000);

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.showAlertPopup(error.error.message, 'error')
        // Set loading to false
        this.loading = false;
      }
    );
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
