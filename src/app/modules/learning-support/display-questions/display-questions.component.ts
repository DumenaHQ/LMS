import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LearningSupportService } from 'src/app/services/learning-support.service';
import { learningSupportModel } from '../models/learning-support.model';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.scss']
})
export class DisplayQuestionsComponent implements OnInit {
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
    this.getQuestionsForAClassroom();
  }

  getQuestionsForAClassroom() {
    this.dataLoading = true;
    this.learningSupportService
      .getQuestionsForClass(this.classroomId)
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
