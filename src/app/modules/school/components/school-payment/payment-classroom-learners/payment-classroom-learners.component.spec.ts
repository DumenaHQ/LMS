import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentClassroomLearnersComponent } from './payment-classroom-learners.component';

describe('PaymentClassroomLearnersComponent', () => {
  let component: PaymentClassroomLearnersComponent;
  let fixture: ComponentFixture<PaymentClassroomLearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentClassroomLearnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentClassroomLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
