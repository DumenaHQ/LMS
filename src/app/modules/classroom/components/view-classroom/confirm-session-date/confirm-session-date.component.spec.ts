import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSessionDateComponent } from './confirm-session-date.component';

describe('ConfirmSessionDateComponent', () => {
  let component: ConfirmSessionDateComponent;
  let fixture: ComponentFixture<ConfirmSessionDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSessionDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSessionDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
