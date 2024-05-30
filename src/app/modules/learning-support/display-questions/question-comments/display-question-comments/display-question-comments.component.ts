import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LearningSupportService } from 'src/app/services/learning-support.service';

@Component({
  selector: 'app-display-question-comments',
  templateUrl: './display-question-comments.component.html',
  styleUrls: ['./display-question-comments.component.scss']
})
export class DisplayQuestionCommentsComponent implements OnInit {

  @Input() questionId: any;
  comments: any;
  userDetails: any;
  dataLoading: boolean;

  constructor(
    private authService: AuthService,
    private learningSupportService: LearningSupportService,
    private changeDectetorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userDetails = this.authService.getUser().user;
    this.getQuestionComments();
  }

  getQuestionComments() {
    this.dataLoading = true;
    this.learningSupportService
      .getQuestionComments(this.questionId)
      .subscribe({
        next: (res: any) => {
          this.dataLoading = false;
          this.comments = res.data.comments;   
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      });
  }

  getNameInitials(name: string): string {
    const parts = name.trim().split(' ');
    const initials = parts.slice(0, 2).map(part => part[0]);
    return initials.join('');
  }

  // Check if date is current date
  isCurrentDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

}
