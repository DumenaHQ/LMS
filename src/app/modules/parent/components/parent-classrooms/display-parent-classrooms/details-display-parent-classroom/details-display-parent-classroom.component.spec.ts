import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDisplayParentClassroomComponent } from './details-display-parent-classroom.component';

describe('DetailsDisplayParentClassroomComponent', () => {
  let component: DetailsDisplayParentClassroomComponent;
  let fixture: ComponentFixture<DetailsDisplayParentClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDisplayParentClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDisplayParentClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
