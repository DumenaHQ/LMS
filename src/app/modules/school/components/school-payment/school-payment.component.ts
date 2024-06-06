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
  orders: any;
  order: any;
  grandTotal: number = 0;
  isVoucher: boolean = false;
  activePlans: any;
  allPlans: any;
  reference: any;
  classrooms?: ClassroomModel[];
  dataLoading: boolean;
  learners: any;
  selectedLearners: any[] = [];
  confirmModal: boolean = false;
  confirmMessage: string;

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
    if(event.target.value !== ''){ 
      this.getClassroomById(event.target.value);
    }
  }

  isLearnerSelected(learner: any): boolean {
    return this.selectedLearners.some(selected => selected.userId === learner.id);
  }

  selectLearner(event: any, learner: any) {
    if (event.target.checked) {
      this.selectedLearners.push({
        userId: learner.id, 
        order_type: 'sub', 
        slug: 'standard-plan'
      });
      this.appAlertService.showAlert('Learner selected', AlertType.Warning);
    } else {
      this.selectedLearners = this.selectedLearners.filter(selected => selected.userId !== learner.id);
      this.appAlertService.showAlert('Learner removed', AlertType.Warning);
    }
  }

  selectAllLearner(event: any) {
    if (event.target.checked) {
      this.selectedLearners = [];
      this.learners.map((learner: any) => {
        this.selectedLearners.push({
          userId: learner.id, 
          order_type: 'sub', 
          slug: 'standard-plan'
        })
      });
      this.appAlertService.showAlert('All learners selected', AlertType.Warning);
    } else {
      this.selectedLearners = [];
      this.appAlertService.showAlert('All learners removed', AlertType.Warning);
    }
  }

  openConfirmModal() {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to make payment for ${this.selectedLearners.length} ${this.selectedLearners.length > 1 ? 'learners' : 'learner'}?`;
  }

  makePayment() {
    console.log(`Payment done for ${this.selectedLearners.length} learners`);
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
  payWithPaystack() {
    let url = this.baseUrl;
    let router = this.router;
    let userRole = this.user.role;
    let zone = this.ngZOne;
    // let reference = this.reference;
    // let amount = this.grandTotal;
    // @ts-ignore
    let handler = PaystackPop.setup({
      key: this.key,
      email: this.user.email,
      amount: this.grandTotal * 100,
      currency: 'NGN',
      ref: this.reference,
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
              // if payment is successful, route user to children page
              if (data.status == true) {
                zone.run(() => {
                  // router.navigate([userRole + '/children']);
                  this.getOrders();
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

