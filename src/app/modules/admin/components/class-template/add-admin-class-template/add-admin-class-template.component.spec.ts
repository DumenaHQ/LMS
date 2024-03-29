import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminClassTemplateComponent } from './add-admin-class-template.component';

describe('AddAdminClassTemplateComponent', () => {
  let component: AddAdminClassTemplateComponent;
  let fixture: ComponentFixture<AddAdminClassTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminClassTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
