import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ClassroomModel } from 'src/app/modules/classroom/models/classroom.model';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { OrderService } from 'src/app/services/order.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-school-payment',
  templateUrl: './school-payment.component.html',
  styleUrls: ['./school-payment.component.scss'],
})
export class SchoolPaymentComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  key = environment.paystackKey;
  user: any;
  grandTotal: number = 0;
  planAmount: number = 15000;
  isVoucher: boolean = false;
  classrooms?: any[];
  dataLoading: boolean;
  confirmModal: boolean = false;
  confirmMessage: string;
  loading: boolean;
  isClassroomLearners: boolean = false;
  classroom: any;
  classroomsSelectedLearners: any = {};
  totalSelectedLearners: any;
  checkboxLoading: { [key: string]: boolean } = {};

  constructor(
    private classroomService: ClassroomService,
    private orderService: OrderService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private ngZOne: NgZone,
    private changeDectetorRef: ChangeDetectorRef,
    private appAlertService: AppAlertService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;
    this.getClassrooms();
  }

  getClassrooms() {
    this.dataLoading = true;
    this.classroomService.getClassrooms().subscribe({
      next: (res: any) => {
        this.classrooms = (res.data.classes || []);
        this.classrooms?.forEach((classroom: any) => {
          this.classroomsSelectedLearners[classroom.id] = [];
        });        
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  openViewClassroomLearners(classroom: any) {
    this.classroom = classroom;
    this.isClassroomLearners = true;
  }
  
  closeViewClassroomLearners() {
    this.isClassroomLearners = false;
  }
  
  getSelectedClassroomLearners(event: any) {
    this.classroomsSelectedLearners = event;  
  
    this.getLearnersGrandTotal();
    this.closeViewClassroomLearners();
  }

  toggleSelectAllLearnerForAClass(event: any, classroom: any) {
    const classroomId = classroom.id;

    if (event.target.checked) {
      this.checkboxLoading[classroomId] = true;
      this.classroomService.getClassroomById(classroomId).subscribe({
        next: (res: any) => {
          this.classroomsSelectedLearners[classroomId] = res.data.class.learners.map((learner: any) => ({ learnerId: learner.id }));
          this.appAlertService.showAlert(`All learners for ${classroom.name} selected`, AlertType.Warning);
          this.getLearnersGrandTotal();
          this.checkboxLoading[classroomId] = false;
        },
        error: (e) => console.error(e),
      });
    } else {
      this.classroomsSelectedLearners[classroomId] = [];
      this.appAlertService.showAlert(`All learners for ${classroom.name} removed`, AlertType.Warning);
      this.getLearnersGrandTotal();
    }
  }

  getLearnersGrandTotal() {
    this.totalSelectedLearners = Object.values(this.classroomsSelectedLearners)
    .reduce((sum: any, learners: any) => sum + learners.length, 0);
    this.grandTotal = this.planAmount * this.totalSelectedLearners;
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
      items: Object.values(this.classroomsSelectedLearners)
        .reduce((accumulator: any, learners: any) => {
          return accumulator.concat(
            learners.map((learner: any) => ({
              user_id: learner.learnerId,
              order_type: 'sub',
              slug: 'standard-plan'
            }))
          );
        }, [])
    }; 
    
    this.orderService.addOrder(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.payWithPaystack(res.data.order.reference, res.data.order.total_amount);
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
    });
    
    // let payload = {
    //   "classes": Object.entries(this.classroomsSelectedLearners).map(([class_id, learners]) => ({
    //     class_id,
    //     learners: (learners as any[]).map((learner: any) => learner.learnerId)
    //   }))
    // }; 

    // // this.subscriptionService.createSchoolSubcription(payload).subscribe({
    // //   next: (res: any) => {            
    // //     if(res.status == true) {
    // //       this.loading = false;
    // //       this.payWithPaystack(res.data.access_code);
    // //     }
    // //   },
    // //   error: (e) => {
    // //     console.error(e);
    // //     this.loading = false;
    // //   },
    // // });
  }

  // Pay with Paystack
  payWithPaystack(amount: number, ref: string) {
    let url = this.baseUrl;
    let zone = this.ngZOne;
    let handler = (<any>window).PaystackPop.setup({
      key: this.key,
      email: this.user.email,
      amount: amount * 100,
      currency: 'NGN',
      ref: ref,
      // access_code: access_code,
      callback: function (response: any) {
        var reference = response.reference;
        if (response.status === 'success') {
          fetch(url + 'payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ reference }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log({ data });
              if (data.status == true) {
                zone.run(() => {
                  this.getClassrooms();
                  this.closeConfirmModal();
                });
              }
            });
        }
      },
      onClose: () => {
        this.appAlertService.showAlert('Transaction was not completed', AlertType.Error);
        this.changeDectetorRef.detectChanges();
      },
    });
    handler.openIframe();
  }

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }
}

