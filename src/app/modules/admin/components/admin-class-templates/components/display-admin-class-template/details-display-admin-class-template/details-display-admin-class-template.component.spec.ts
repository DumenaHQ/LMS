import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDisplayAdminClassTemplateComponent } from './details-display-admin-class-template.component';

describe('DetailsDisplayAdminClassTemplateComponent', () => {
  let component: DetailsDisplayAdminClassTemplateComponent;
  let fixture: ComponentFixture<DetailsDisplayAdminClassTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDisplayAdminClassTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDisplayAdminClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
