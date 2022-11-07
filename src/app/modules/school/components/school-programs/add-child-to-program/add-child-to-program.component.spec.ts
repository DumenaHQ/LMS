import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildToProgramComponent } from './add-child-to-program.component';

describe('AddChildToProgramComponent', () => {
  let component: AddChildToProgramComponent;
  let fixture: ComponentFixture<AddChildToProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChildToProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChildToProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
