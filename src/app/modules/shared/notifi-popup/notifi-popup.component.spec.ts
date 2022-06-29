import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiPopupComponent } from './notifi-popup.component';

describe('NotifiPopupComponent', () => {
  let component: NotifiPopupComponent;
  let fixture: ComponentFixture<NotifiPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifiPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifiPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
