import { Component, OnInit } from '@angular/core';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-school-payment',
  templateUrl: './school-payment.component.html',
  styleUrls: ['./school-payment.component.scss'],
})
export class SchoolPaymentComponent implements OnInit {
  user: any;
  grandTotal: number = 0;
  subAmount: number = 0;
  isVoucher: boolean = false;
  classrooms: any;
  dataLoading: boolean;
  confirmModal: boolean = false;
  confirmMessage: string;
  loading: boolean;
  viewClassroomLearners: boolean = false;
  classroom: any;
  classroomsSelectedLearners: any;
  totalSelectedLearners: any;

  constructor(
    private classroomService: ClassroomService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private appAlertService: AppAlertService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;
    this.getClassrooms();
  }

  getClassrooms() {
    this.dataLoading = true;
    this.classroomService.getClassrooms().subscribe({
      next: (res: any) => {
        this.classrooms = res.data.classes; 
        this.createSelectAllClassrooms();
        this.getLearnersGrandTotal();
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  openViewClassroomLearners(classroom: any) {
    this.classroom = classroom;
    this.viewClassroomLearners = true;
  }
  
  closeViewClassroomLearners() {
    this.viewClassroomLearners = false;
  }
  
  getSelectedClassroomLearners(event: any) {
    this.classroomsSelectedLearners = event;  
    this.getLearnersGrandTotal();
    this.closeViewClassroomLearners();
  }

  isClassroomSelected(classroom: any): boolean {
    return this.classroomsSelectedLearners?.classes.some((selected: any) => selected.class_id === classroom.id);
  }

  toggleSelectClass(event: any, classroom: any) {
    if (event.target.checked) {
      this.classroomsSelectedLearners?.classes.push(this.createClassObject(classroom));
      this.appAlertService.showAlert('Classroom selected', AlertType.Warning);
    } else {
      this.classroomsSelectedLearners = {
        classes: this.classroomsSelectedLearners?.classes.filter((selected: any) => selected.class_id !== classroom.id)
      };
      this.appAlertService.showAlert('Classroom removed', AlertType.Warning);
    }
    this.getLearnersGrandTotal();
  }

  toggleSelectAllClass(event: any) {
    if (event.target.checked) {
      this.createSelectAllClassrooms();
      this.appAlertService.showAlert('All classrooms selected', AlertType.Warning);
    } else {
      this.classroomsSelectedLearners = { classes: [] };
      this.appAlertService.showAlert('All classrooms removed', AlertType.Warning);
    }
    this.getLearnersGrandTotal();    
  }

  createClassObject(classroom: any) {
    return { 
      class_id: classroom.id,
      allLearners: true,
      learners: [],
      learner_count: classroom.learner_count
    }
  }

  createSelectAllClassrooms() {
    this.classroomsSelectedLearners = {
      classes: this.classrooms
        ?.filter((classroom: any) => classroom.sub_status !== 'full') // Only select classroom that haven't been fully paid for
        .map((classroom: any) => this.createClassObject(classroom)),
    };
  }

  getTotalSelectedLearnersCheck(classroom: any) {
    let selectedLearners = `0 / ${classroom.learner_count}`;
    this.classroomsSelectedLearners?.classes.forEach((classroomSelect: any) => {
      if (classroomSelect.class_id === classroom?.id) {
        if(classroomSelect.allLearners) {
          selectedLearners = `${classroom.learner_count} / ${classroom.learner_count}`;
        } else {
          selectedLearners = `${classroomSelect.learners.length} / ${classroom.learner_count}`;
        }
      }
    });
    return selectedLearners;
  }

  getClassTotalAmount(classroom: any) {
    let learnersAmount = 0;
    this.classroomsSelectedLearners?.classes.forEach((classroomSelect: any) => {
      if (classroomSelect.class_id === classroom?.id) {
        if(classroomSelect.allLearners) {
          learnersAmount = classroom.learner_count * this.subAmount;
        } else {
          learnersAmount = classroomSelect.learners.length * this.subAmount;
        }
      }      
    });
    return learnersAmount;
  }

  getLearnersGrandTotal() {
    // Use learner_count if allLearners is true, otherwise use learners.length
    this.totalSelectedLearners = this.classroomsSelectedLearners.classes.reduce((total: any, classroom: any) => {
      return total + (classroom.allLearners ? classroom.learner_count : classroom.learners.length);
    }, 0);
    this.grandTotal = this.calculateClassSubAmount(this.totalSelectedLearners) * this.totalSelectedLearners;
  }

  calculateClassSubAmount(numOfLearners: number) {
    if (numOfLearners < 101)
      this.subAmount = 10000;
    else if (numOfLearners > 100 && numOfLearners < 201)
      this.subAmount = 9500;
    else if (numOfLearners > 200 && numOfLearners < 301)
      this.subAmount = 9000;
    else if (numOfLearners > 300 && numOfLearners < 401)
      this.subAmount = 8500;
    else if (numOfLearners > 400 && numOfLearners < 501)
      this.subAmount = 8000
    else 
      this.subAmount = 7500;
    return this.subAmount;
  }
  
  openConfirmModal() {
    this.confirmModal = true;
    const formattedGrandTotal = new Intl.NumberFormat().format(this.grandTotal);
    this.confirmMessage = `Are you sure you want to pay ₦${formattedGrandTotal} for ${this.totalSelectedLearners} ${this.totalSelectedLearners > 1 ? 'learners' : 'learner'}?`;
  }

  makePayment() {
    this.closeConfirmModal();
    this.loading = true;
    
    let payload = {
      classes: this.classroomsSelectedLearners.classes.map((classroom: any) => {
        if (classroom.allLearners) {
          return {
            class_id: classroom.class_id
          };
        } else {
          return {
            class_id: classroom.class_id,
            learners: classroom.learners
          };
        }
      })
    };

    this.subscriptionService.createSchoolSubcription(payload).subscribe({
      next: (res: any) => {            
        if(res.status == true) {
          this.loading = false;
          this.paymentService.payWithPaystack(res.data.access_code);
        }
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
    });
  }

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }
}

