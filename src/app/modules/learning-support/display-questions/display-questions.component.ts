import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LearningSupportService } from 'src/app/services/learning-support.service';
import { learningSupportModel } from '../models/learning-support.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.scss']
})
export class DisplayQuestionsComponent implements OnInit {
  @Input() courses: any;
  @Input() classroomId: any;
  @Input() programId: any;
  questions?: any;
  questions$: Observable<any>;
  addQuestion: boolean = false;
  dataLoading: boolean;
  activeIndex: number | null = null;

  constructor(
    private learningSupportService: LearningSupportService,
    private changeDectetorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.dataLoading = true;

    if(this.classroomId) {
      this.questions$ = this.learningSupportService.getQuestionsForClass(this.classroomId);
    } else {
      this.questions$ = this.learningSupportService.getQuestionsForProgram(this.programId);
    }
    this.questions$.subscribe({
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
