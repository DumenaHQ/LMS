import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOnboardComponent } from './school-onboard.component';

describe('SchoolOnboardComponent', () => {
  let component: SchoolOnboardComponent;
  let fixture: ComponentFixture<SchoolOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolOnboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
