import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-parent-overview',
  templateUrl: './parent-overview.component.html',
  styleUrls: ['./parent-overview.component.scss'],
})
export class ParentOverviewComponent implements OnInit {
  billingId: string = 'monthly';
  user: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.orderService.getOrder().subscribe((res: any) => {
      console.log(res);
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  addToCart(title: any, amount: any) {
    let payload = {
      slug: title,
      amount: amount,
      user_id: this.user.id,
      order_type: 'sub',
    };
    console.log(payload);

    this.orderService.addOrder(payload).subscribe((res: any) => {
      console.log(res);
      // this.reference = res.reference
    });
  }
}
// amount: 9000
// createdAt: "2022-07-23T02:15:51.328Z"
// id: "62db59d739e0c0eac8cce9e3"
// order_type: "sub"
// order_type_id: "62c92a7abc9c4b8dce41026f"
// reference: "ORD_rill469wvaafbjm"
// status: "pending"
// updatedAt: "2022-07-23T02:15:51.328Z"
// user: "62db481c39e0c0eac8cce9af"
