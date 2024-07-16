import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramLearnersComponent } from './add-program-learners.component';

describe('AddProgramLearnersComponent', () => {
  let component: AddProgramLearnersComponent;
  let fixture: ComponentFixture<AddProgramLearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramLearnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
