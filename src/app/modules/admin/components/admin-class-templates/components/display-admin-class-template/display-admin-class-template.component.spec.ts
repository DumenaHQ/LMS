import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminClassTemplateComponent } from './display-admin-class-template.component';

describe('DisplayAdminClassTemplateComponent', () => {
  let component: DisplayAdminClassTemplateComponent;
  let fixture: ComponentFixture<DisplayAdminClassTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminClassTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAdminClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
