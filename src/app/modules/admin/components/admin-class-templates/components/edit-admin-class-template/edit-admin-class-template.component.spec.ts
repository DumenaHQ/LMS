import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminClassTemplateComponent } from './edit-admin-class-template.component';

describe('EditAdminClassTemplateComponent', () => {
  let component: EditAdminClassTemplateComponent;
  let fixture: ComponentFixture<EditAdminClassTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminClassTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
