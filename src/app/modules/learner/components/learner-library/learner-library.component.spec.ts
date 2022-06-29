import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerLibraryComponent } from './learner-library.component';

describe('LearnerLibraryComponent', () => {
  let component: LearnerLibraryComponent;
  let fixture: ComponentFixture<LearnerLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
