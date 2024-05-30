import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayQuestionAdminComponent } from './blank-display-question-admin.component';

describe('BlankDisplayQuestionAdminComponent', () => {
  let component: BlankDisplayQuestionAdminComponent;
  let fixture: ComponentFixture<BlankDisplayQuestionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayQuestionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayQuestionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
