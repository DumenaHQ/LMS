import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentOnboardComponent } from './parent-onboard.component';

describe('ParentOnboardComponent', () => {
  let component: ParentOnboardComponent;
  let fixture: ComponentFixture<ParentOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentOnboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
