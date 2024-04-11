import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayComponent } from './blank-display.component';

describe('BlankDisplayComponent', () => {
  let component: BlankDisplayComponent;
  let fixture: ComponentFixture<BlankDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
