import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomModel } from 'src/app/modules/classroom/models/classroom.model';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { OrderService } from 'src/app/services/order.service';
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
  classrooms?: ClassroomModel[];
  dataLoading: boolean;
  learners: any;
  selectedLearners: any[] = [];
  confirmModal: boolean = false;
  confirmMessage: string;
  loading: boolean;

  constructor(
    private classroomService: ClassroomService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private ngZOne: NgZone,
    private changeDectetorRef: ChangeDetectorRef,
    private appAlertService: AppAlertService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;
    this.getAllOrders();
    this.getActiveOrder();
    this.getClassrooms();
  }

  getClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: (res: any) => {
        this.classrooms = (res.data.classes || []);
      },
      error: (e) => console.error(e)
    });
  }

  getClassroomById(classroomId: string) {
    this.dataLoading = true;
    this.classroomService.getClassroomById(classroomId).subscribe({
      next: (res: any) => {
        this.learners = res.data.class.learners;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }
  
  handleSelectChange(event: any) {
    if(event.target.value !== '') { 
      this.getClassroomById(event.target.value);
    }
  }

  isLearnerSelected(learner: any): boolean {
    return this.selectedLearners.some(selected => selected.learnerId === learner.id);
  }

  selectLearner(event: any, learner: any) {
    if (event.target.checked) {
      this.selectedLearners.push({ learnerId: learner.id });
      this.appAlertService.showAlert('Learner selected', AlertType.Warning);
    } else {
      this.selectedLearners = this.selectedLearners.filter(selected => selected.learnerId !== learner.id);
      this.appAlertService.showAlert('Learner removed', AlertType.Warning);
    }
    this.grandTotal = this.planAmount * this.selectedLearners.length;
  }

  selectAllLearner(event: any) {
    if (event.target.checked) {
      this.selectedLearners = [];
      this.learners.map((learner: any) => {
        this.selectedLearners.push({ learnerId: learner.id })
      });
      this.appAlertService.showAlert('All learners selected', AlertType.Warning);
    } else {
      this.selectedLearners = [];
      this.appAlertService.showAlert('All learners removed', AlertType.Warning);
    }
    this.grandTotal = this.planAmount * this.selectedLearners.length;
  }

  openConfirmModal() {
    this.confirmModal = true;
    const formattedGrandTotal = new Intl.NumberFormat().format(this.grandTotal);
    this.confirmMessage = `Are you sure you want to make pay ₦${formattedGrandTotal} for ${this.selectedLearners.length} ${this.selectedLearners.length > 1 ? 'learners' : 'learner'}?`;
  }

  makePayment() {
    this.loading = true;
    let payload = {
      items: this.selectedLearners.map((learner: any) => ({
        user_id: learner.learnerId,
        order_type: 'sub',
        slug: 'standard-plan'
      }))
    }

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
  }

  // Get all orders
  getAllOrders() {
    // this.orderService.getOrders().subscribe({
    //   next: (res: any) => {
    //     this.allPlans = res.data.orders;
    //     this.reference = res.data.orders[0].reference;
    //   },
    //   error: (e) => console.error(e),
    // });
  }

  // Get active order
  getActiveOrder() {
    // this.orderService.getActiveOrder().subscribe({
    //   next: (res: any) => {
    //     this.activePlans = res.data.order;
    //     // this.reference = res.data.orders[0].reference;
    //     this.grandTotal = res.data.order.total_amount
        
    //   },
    //   error: (e) => console.error(e),
    // });
  }

  // Pay with Paystack
  payWithPaystack(reference: string, amount: number) {
    let url = this.baseUrl;
    let zone = this.ngZOne;
    // @ts-ignore
    let handler = PaystackPop.setup({
      key: this.key,
      email: this.user.email,
      amount: amount * 100,
      currency: 'NGN',
      ref: reference,
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

