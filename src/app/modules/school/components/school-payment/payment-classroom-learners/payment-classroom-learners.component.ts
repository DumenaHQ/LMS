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
  @Input() classroomsSelectedLearners: any;
  @Output() learnersModal: EventEmitter<any> = new EventEmitter();
  dataLoading: boolean;
  learners: any;
  selectedLearners: any[] = [];
  classSelectedLearner: any;

  constructor(
    private classroomService: ClassroomService,
    private appAlertService: AppAlertService,
  ) { }

  ngOnInit(): void {
    this.getClassroomById();
    console.log(this.classroomsSelectedLearners);
    // Initialize selectedLearners from classroomsSelectedLearners for the current classroom
    if (this.classroom && this.classroomsSelectedLearners[this.classroom.id]) {
      this.selectedLearners = [...this.classroomsSelectedLearners[this.classroom.id]];
    } 
  }

  getClassroomById() {
    this.dataLoading = true;
    this.classroomService.getClassroomById(this.classroom.id).subscribe({
      next: (res: any) => {
        this.learners = res.data.class.learners;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  isLearnerSelected(learner: any): boolean {
    return this.selectedLearners.some(selected => selected.learnerId === learner.id);
  }
  
  selectLearner(event: any, learner: any) {
    const currentClassroomId = this.classroom.id;
  
    if (event.target.checked) {
      this.selectedLearners.push({ learnerId: learner.id });
      if (!this.classroomsSelectedLearners[currentClassroomId]) {
        this.classroomsSelectedLearners[currentClassroomId] = [];
      }
      this.classroomsSelectedLearners[currentClassroomId].push({ learnerId: learner.id });
      this.appAlertService.showAlert('Learner selected', AlertType.Warning);
    } else {
      this.selectedLearners = this.selectedLearners.filter(selected => selected.learnerId !== learner.id);
      this.classroomsSelectedLearners[currentClassroomId] = this.classroomsSelectedLearners[currentClassroomId].filter((selected: any) => selected.learnerId !== learner.id);
      this.appAlertService.showAlert('Learner removed', AlertType.Warning);
    }
  }
  
  toggleSelectAllLearner(event: any) {
    const currentClassroomId = this.classroom.id;
  
    if (event.target.checked) {
      this.selectedLearners = [];
      this.learners.map((learner: any) => {
        this.selectedLearners.push({ learnerId: learner.id });
      });
      this.classroomsSelectedLearners[currentClassroomId] = [...this.selectedLearners];
      this.appAlertService.showAlert('All learners selected', AlertType.Warning);
    } else {
      this.selectedLearners = [];
      this.classroomsSelectedLearners[currentClassroomId] = [];
      this.appAlertService.showAlert('All learners removed', AlertType.Warning);
    }
  }

  proceed() {
    console.log(this.selectedLearners);
    
    console.log(this.classroomsSelectedLearners);
    
    // this.learnersModal.emit(this.selectedLearners);
    
    // this.classSelectedLearner = {
    //   [this.classroom.id]: this.selectedLearners
    // }

    // console.log(this.classSelectedLearner);
    // this.learnersModal.emit(this.classSelectedLearner);
    
  }
  
  closeLearnesmModal() {
    this.selectedLearners = [];
    this.proceed();
  }

}
