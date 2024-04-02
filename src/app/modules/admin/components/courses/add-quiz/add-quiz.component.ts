import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
export class AddQuizComponent implements OnInit {

  @Input() courseId: any;
  @Input() moduleId: any;
  @Output() addQuizToCourseModal: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  selectedQuizzes: any[] = [];
  quizzes: any;
  dataLoading: boolean = true;
  quizName: string;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getAllquizzes();
  }

  // Get all quizzes
  getAllquizzes() {
    this.quizService.getAllquizzes().subscribe({
      next: (res: any) => {
        this.quizzes = res.data.quizzes;
        console.log(this.quizzes);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
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
      course_id: this.courseId,
      quiz_level: "module", // ["course", "lesson"] optional field
      quiz_level_id: this.moduleId
    };       

    this.quizService.addQuizToCourse(this.selectedQuizzes[0], payload).subscribe(
      (res: any) => {
        console.log(res);
        
        this.showAlertPopup(res.message, 'success');

        setTimeout(() => {
          window.location.reload();
        }, 5000);

          // Set loading to false
          this.loading = false;
        },
        (error: any) => {
          console.log(error);
          this.showAlertPopup(error.error.message, 'error');
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

  // Close Add Modal
  closeAddQuizToCourse() {
    this.addQuizToCourseModal.emit();
  }
  

 }
