import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentProgramsComponent } from './parent-programs.component';

describe('ParentProgramsComponent', () => {
  let component: ParentProgramsComponent;
  let fixture: ComponentFixture<ParentProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
