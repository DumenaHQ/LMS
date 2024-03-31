import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseAdminClassTemplateComponent } from './add-course-admin-class-template.component';

describe('AddCourseAdminClassTemplateComponent', () => {
  let component: AddCourseAdminClassTemplateComponent;
  let fixture: ComponentFixture<AddCourseAdminClassTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseAdminClassTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseAdminClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
