import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-onboard',
  templateUrl: './school-onboard.component.html',
  styleUrls: ['./school-onboard.component.scss']
})
export class SchoolOnboardComponent implements OnInit {

  @Input() schoolSettings: any;
  @Output() onboardEvent: EventEmitter<any> = new EventEmitter();
  onBoardSect: number = 1;
  isConfirmSessionDate: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  goToClassroomsPage() {
    this.closeModal();
    this.router.navigate(['/school/classrooms']);
  }

  openConfirmSessionDate() {
    this.isConfirmSessionDate = true;
  }

  closeConfirmSessionDate() {
    this.isConfirmSessionDate = false;
    this.onBoardSect = 2;
  }
  
  closeModal() {
    this.onboardEvent.emit();
  }

}
