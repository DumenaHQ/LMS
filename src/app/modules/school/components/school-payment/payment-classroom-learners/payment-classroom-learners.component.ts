import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-payment-classroom-learners',
  templateUrl: './payment-classroom-learners.component.html',
  styleUrls: ['./payment-classroom-learners.component.scss']
})
export class PaymentClassroomLearnersComponent implements OnInit {

  @Input() classroom: any;
  @Input() classroomsSelectedLearners: any[];
  @Output() learnersModal: EventEmitter<any> = new EventEmitter();
  dataLoading: boolean;
  learners: any;
  classSelectedLearner: any;
  classroomLearnersLength: any;

  constructor(
    private classroomService: ClassroomService,
    private appAlertService: AppAlertService,
  ) { }

  ngOnInit(): void {
    this.getClassroomLearners();
  }

  getClassroomLearners() {
    this.dataLoading = true;
    let paymentStatus = 'unpaid';
    this.classroomService.getClassroomLearnersByClassroomId(this.classroom.id, paymentStatus).subscribe({
      next: (res: any) => {
        this.learners = res.data.learners;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  isLearnerSelected(learner: any): boolean {
    const currentClassroomId = this.classroom?.id;
    return this.classroomsSelectedLearners[currentClassroomId]?.some((selected: any) => selected.learnerId === learner.id);
  }
  
  selectLearner(event: any, learner: any) {
    const currentClassroomId = this.classroom.id;
  
    if (event.target.checked) {
      if (!this.classroomsSelectedLearners[currentClassroomId]) {
        this.classroomsSelectedLearners[currentClassroomId] = [];
      }
      this.classroomsSelectedLearners[currentClassroomId].push({ learnerId: learner.id });
      this.appAlertService.showAlert('Learner selected', AlertType.Warning);
    } else {
      this.classroomsSelectedLearners[currentClassroomId] = this.classroomsSelectedLearners[currentClassroomId].filter((selected: any) => selected.learnerId !== learner.id);
      this.appAlertService.showAlert('Learner removed', AlertType.Warning);
    }
  }
  
  toggleSelectAllLearner(event: any) {
    const currentClassroomId = this.classroom.id;
  
    if (event.target.checked) {
      this.classroomsSelectedLearners[currentClassroomId] = this.learners.map((learner: any) => ({ learnerId: learner.id }));
      this.appAlertService.showAlert('All learners selected', AlertType.Warning);
    } else {
      this.classroomsSelectedLearners[currentClassroomId] = [];
      this.appAlertService.showAlert('All learners removed', AlertType.Warning);
    }
  }

  proceed() {
    this.learnersModal.emit(this.classroomsSelectedLearners);
  }

}
