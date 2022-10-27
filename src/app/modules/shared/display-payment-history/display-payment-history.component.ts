import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-payment-history',
  templateUrl: './display-payment-history.component.html',
  styleUrls: ['./display-payment-history.component.scss'],
})
export class DisplayPaymentHistoryComponent implements OnInit {
  paymentsHistory: any;

  constructor() {}

  ngOnInit(): void {}
}
