import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
export class AddQuizComponent implements OnInit {

  @Input() course: any;
  @Output() addQuizToCourseModal: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  selectedQuizzes: any[] = [];
  quizzes: any;
  dataLoading: boolean = true;
  quizName: string;
  modules: any;
  lessons: any;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private appAlertService: AppAlertService,
  ) {}

  ngOnInit(): void {
    this.modules = this.course.modules;
    this.initForm();
    this.getAllquizzes();
    console.log(this.course);
    
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      module: ['', [Validators.required]],
      lesson: ['', [Validators.required]],
    });
  }

  // Get all quizzes
  getAllquizzes() {
    this.quizService.getAllquizzes().subscribe({
      next: (res: any) => {
        this.quizzes = res.data.quizzes;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
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
  }

  // Search quiz
  search() {
    if (this.quizName != "") {
      this.quizzes = this.quizzes.filter((res: any) => {
        return res.title.toLocaleLowerCase().match(this.quizName.toLocaleLowerCase());
      });
    } else if (this.quizName == "") {
      this.ngOnInit()
    }
  }

  // Select quizzes
  selectQuiz(event: any, quiz: any) {

    // If doesn't exist add new student
    if(event.target.checked === false) {
      this.selectedQuizzes.forEach((element: any, index: any) => {
        if(element.title === quiz.title) {
          this.selectedQuizzes.splice(index, 1)
        }
        return this.selectedQuizzes
      });
    }
    else {
      this.selectedQuizzes.push(quiz.id);
    }
  }

  // Add quiz to course
  addQuizToCourse() {
    let payload = {
      course_id: this.course.id,
      quiz_level: "lesson", // ["course", "module", "lesson"] optional field
      quiz_level_id: this.formGroup.value.lesson
    };
    
    this.quizService.addQuizToCourse(this.selectedQuizzes[0], payload).subscribe({
      next: (res: any) => {
        console.log(res);
        
        // this.appAlertService.showAlert(res.message, AlertType.Success);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
        this.loading = false;
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
