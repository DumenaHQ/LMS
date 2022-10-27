import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPaymentHistoryComponent } from './display-payment-history.component';

describe('DisplayPaymentHistoryComponent', () => {
  let component: DisplayPaymentHistoryComponent;
  let fixture: ComponentFixture<DisplayPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPaymentHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
