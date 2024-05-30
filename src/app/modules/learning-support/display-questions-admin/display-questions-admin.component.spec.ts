import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuestionsAdminComponent } from './display-questions-admin.component';

describe('DisplayQuestionsAdminComponent', () => {
  let component: DisplayQuestionsAdminComponent;
  let fixture: ComponentFixture<DisplayQuestionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQuestionsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQuestionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
