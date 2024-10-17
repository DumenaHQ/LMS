import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolConfirmSessionDateComponent } from './school-confirm-session-date.component';

describe('SchoolConfirmSessionDateComponent', () => {
  let component: SchoolConfirmSessionDateComponent;
  let fixture: ComponentFixture<SchoolConfirmSessionDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolConfirmSessionDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolConfirmSessionDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
