import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCheckComponent } from './verify-check.component';

describe('VerifyCheckComponent', () => {
  let component: VerifyCheckComponent;
  let fixture: ComponentFixture<VerifyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
