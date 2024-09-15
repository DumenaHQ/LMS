import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  selectedClass: any;

  constructor(
    private classroomService: ClassroomService,
    private appAlertService: AppAlertService,
    private changeDetectorRef: ChangeDetectorRef
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
        this.checkClassroomExists();
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }  

  // Check if class with `classroomId` exists in classroomsSelectedLearners.classes
  checkClassroomExists() {
    const classObject = this.classroomsSelectedLearners?.classes?.find(
      (classroom: any) => classroom.class_id === this.classroom.id
    );

    if (classObject) {
      this.selectedClass = classObject;
      this.learners.forEach((learner: any) => {
        if (!this.selectedClass.learners.includes(learner.id)) {
          this.selectedClass.learners.push(learner.id);
        }
        learner.selected = true;
      });
    }
  }

  // Allow selecting/unselecting individual learners
  selectLearner(event: any, learner: any) {
    learner.selected = event.target.checked;
    if (learner.selected) {
      this.addOrCreateClassObject();
      this.selectedClass.learners.push(learner.id);
      this.appAlertService.showAlert('Learner selected', AlertType.Warning);
    } else {
      this.selectedClass.learners = this.selectedClass.learners.filter(
        (id: string) => id !== learner.id
      );
      if (this.selectedClass.learners.length === 0) {
        this.removeClassObject();
      }
      this.appAlertService.showAlert('Learner removed', AlertType.Warning);
    }
    this.updateIsAllLearnerSelectedStatus();
  }

  // Push all learners' IDs into the `classroomsSelectedLearners.classes.learners` array
  toggleSelectAllLearner(event: any) {
    if (event.target.checked) {
      this.learners.forEach((learner: any) => learner.selected = true);
      this.addOrCreateClassObject();
      this.selectedClass.learners = this.learners.map((learner: any) => learner.id);
      this.appAlertService.showAlert('All learners selected', AlertType.Warning);
    } else {
      this.learners.forEach((learner: any) => learner.selected = false);
      this.removeClassObject();
      this.appAlertService.showAlert('All learners removed', AlertType.Warning);
    }
    this.updateIsAllLearnerSelectedStatus();
  }

  // Check if a learner is selected
  isLearnerSelected(learner: any) {
    return this.selectedClass ? this.selectedClass.learners.includes(learner.id) : false;
  }

  updateIsAllLearnerSelectedStatus() {
    this.selectedClass.learners.length === this.selectedClass.learner_count ? this.selectedClass.allLearners = true : this.selectedClass.allLearners = false;
  }

  // Helper method to add or create a new class object
  addOrCreateClassObject() {
    if (!this.selectedClass) {
      this.selectedClass = {
        class_id: this.classroom.id,
        allLearners: false,
        learners: [],
        learner_count: this.classroom.learner_count
      };
      this.classroomsSelectedLearners.classes.push(this.selectedClass);
    }
  }

  // Remove class object when no learners are selected
  removeClassObject() {
    this.classroomsSelectedLearners.classes = this.classroomsSelectedLearners.classes.filter(
      (classroom: any) => classroom.class_id !== this.classroom.id
    );
    this.selectedClass = null;
  }

  // Emit the classroomsSelectedLearners data when proceeding
  proceed() {
    this.learnersModal.emit(this.classroomsSelectedLearners);
  }
}
