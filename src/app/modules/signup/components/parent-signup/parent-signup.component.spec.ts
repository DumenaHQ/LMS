import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSignupComponent } from './parent-signup.component';

describe('ParentSignupComponent', () => {
  let component: ParentSignupComponent;
  let fixture: ComponentFixture<ParentSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
