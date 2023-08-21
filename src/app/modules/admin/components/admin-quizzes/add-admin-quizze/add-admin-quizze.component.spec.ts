import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminQuizzeComponent } from './add-admin-quizze.component';

describe('AddAdminQuizzeComponent', () => {
  let component: AddAdminQuizzeComponent;
  let fixture: ComponentFixture<AddAdminQuizzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminQuizzeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminQuizzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
