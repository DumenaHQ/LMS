import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayAdminClassTemplateComponent } from './blank-display-admin-class-template.component';

describe('BlankDisplayAdminClassTemplateComponent', () => {
  let component: BlankDisplayAdminClassTemplateComponent;
  let fixture: ComponentFixture<BlankDisplayAdminClassTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayAdminClassTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayAdminClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
