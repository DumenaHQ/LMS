import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDisplayAdminClassTemplateComponent } from './grid-display-admin-class-template.component';

describe('GridDisplayAdminClassTemplateComponent', () => {
  let component: GridDisplayAdminClassTemplateComponent;
  let fixture: ComponentFixture<GridDisplayAdminClassTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDisplayAdminClassTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDisplayAdminClassTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
