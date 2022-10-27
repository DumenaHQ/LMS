import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoboticsChampComponent } from './robotics-champ.component';

describe('RoboticsChampComponent', () => {
  let component: RoboticsChampComponent;
  let fixture: ComponentFixture<RoboticsChampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoboticsChampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboticsChampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
