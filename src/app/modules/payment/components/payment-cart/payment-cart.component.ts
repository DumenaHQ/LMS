import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
type Tabs = 'active' | 'all';

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.scss']
})
export class PaymentCartComponent implements OnInit {

  activeTab: Tabs = 'active';
  baseUrl: string = environment.baseUrl;
  user: any;
  grandTotal: number = 0;
  isVoucher: boolean = false;
  loading: boolean = false;
  activePlans: any;
  allPlans: any;
  reference: any;
  totalLearner: number = 0;
  confirmModal: boolean = false;
  confirmMessage: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private ngZOne: NgZone,
    private changeDectetorRef: ChangeDetectorRef,
    private appAlertService: AppAlertService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;
    this.getAllOrders();
    this.getActiveOrder();
  }

  // Get all orders
  getAllOrders() {
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        this.allPlans = res.data.orders;
      },
      error: (e) => console.error(e),
    });
  }

  // Get active order
  getActiveOrder() {
    this.orderService.getActiveOrder().subscribe({
      next: (res: any) => {
        this.activePlans = res.data.order;
        this.reference = res.data.order.reference;
        this.grandTotal = res.data.order.total_amount;
        this.totalLearner = res.data.order.items.length;
      },
      error: (e) => console.error(e),
    });
  }

  openConfirmModal() {
    this.confirmModal = true;
    const formattedGrandTotal = new Intl.NumberFormat().format(this.grandTotal);
    this.confirmMessage = `Are you sure you want to pay ₦${formattedGrandTotal} for ${this.totalLearner} ${this.totalLearner > 1 ? 'learners' : 'learner'}?`;
  }

  // Pay with Paystack
  payWithPaystack() {
    let url = this.baseUrl;
    let zone = this.ngZOne;
    // @ts-ignore
    // let handler = PaystackPop.setup({
    //   key: this.key,
    //   email: this.user.email,
    //   amount: this.grandTotal * 100,
    //   currency: 'NGN',
    //   ref: this.reference,
    //   callback: function (response: any) {
    //     var reference = response.reference;
    //     if (response.status === 'success') {
    //       fetch(url + 'payments/verify', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `bearer ${localStorage.getItem('token')}`,
    //         },
    //         body: JSON.stringify({ reference }),
    //       })
    //         .then((res) => res.json())
    //         .then((data) => {
    //           console.log({ data });
    //           if (data.status == true) {
    //             zone.run(() => {
    //               this.getActiveOrder();
    //               this.closeConfirmModal();
    //             });
    //           }
    //         });
    //     }
    //   },
    //   onClose: () => {
    //     this.appAlertService.showAlert('Transaction was not completed', AlertType.Error);
    //     this.changeDectetorRef.detectChanges();
    //   },
    // });
    // handler.openIframe();
  }

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }

  // Set active Tab
  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  // Remove item from localstorage
  // removeItemFromLocalStorage(plan: any): void {
  //   this.orderService.removePlan(plan);
  //   this.appAlertService.showAlert('Item removed from cart', AlertType.Success);
  // }

}

