import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerLibraryOverviewComponent } from './learner-library-overview.component';

describe('LearnerLibraryOverviewComponent', () => {
  let component: LearnerLibraryOverviewComponent;
  let fixture: ComponentFixture<LearnerLibraryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerLibraryOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerLibraryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
