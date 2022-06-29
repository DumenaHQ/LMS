import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOverviewComponent } from './signup-overview.component';

describe('SignupOverviewComponent', () => {
  let component: SignupOverviewComponent;
  let fixture: ComponentFixture<SignupOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
