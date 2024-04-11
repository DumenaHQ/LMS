import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizResultComponent } from './view-quiz-result.component';

describe('ViewQuizResultComponent', () => {
  let component: ViewQuizResultComponent;
  let fixture: ComponentFixture<ViewQuizResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuizResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
