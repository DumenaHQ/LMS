import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOverviewComponent } from './school-overview.component';

describe('SchoolOverviewComponent', () => {
  let component: SchoolOverviewComponent;
  let fixture: ComponentFixture<SchoolOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
