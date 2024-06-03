import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LearningSupportService } from 'src/app/services/learning-support.service';

@Component({
  selector: 'app-display-questions-admin',
  templateUrl: './display-questions-admin.component.html',
  styleUrls: ['./display-questions-admin.component.scss']
})
export class DisplayQuestionsAdminComponent implements OnInit {

  @Input() classroomCourses: any;
  @Input() classroomId: any;
  questions?: any;
  addQuestion: boolean = false;
  dataLoading: boolean;
  activeIndex: number | null = null;

  constructor(
    private learningSupportService: LearningSupportService,
    private changeDectetorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.dataLoading = true;
    this.learningSupportService
      .getAllQuestions()
      .subscribe({
        next: (res: any) => {
          this.dataLoading = false;
          this.questions = res.data.questions;   
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      });
  }

  // Check if date is current date
  isCurrentDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  // Open add learner to classroom modal
  openAddQuestionModal() {
    this.addQuestion = true;
  }

  // Close add learner to classroom modal
  closeAddQuestionModal() {
    this.addQuestion = false;
  }

  toggleAccordion(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

}

