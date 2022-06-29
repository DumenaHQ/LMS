import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPopupAlertComponent } from './dashboard-popup-alert.component';

describe('DashboardPopupAlertComponent', () => {
  let component: DashboardPopupAlertComponent;
  let fixture: ComponentFixture<DashboardPopupAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPopupAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPopupAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
