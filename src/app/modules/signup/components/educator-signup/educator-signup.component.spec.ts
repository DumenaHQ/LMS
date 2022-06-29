import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorSignupComponent } from './educator-signup.component';

describe('EducatorSignupComponent', () => {
  let component: EducatorSignupComponent;
  let fixture: ComponentFixture<EducatorSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducatorSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
