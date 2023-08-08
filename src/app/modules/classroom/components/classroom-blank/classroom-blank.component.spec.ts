import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomBlankComponent } from './classroom-blank.component';

describe('ClassroomBlankComponent', () => {
  let component: ClassroomBlankComponent;
  let fixture: ComponentFixture<ClassroomBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomBlankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
