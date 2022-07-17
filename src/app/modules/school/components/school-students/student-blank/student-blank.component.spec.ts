import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBlankComponent } from './student-blank.component';

describe('StudentBlankComponent', () => {
  let component: StudentBlankComponent;
  let fixture: ComponentFixture<StudentBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBlankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
