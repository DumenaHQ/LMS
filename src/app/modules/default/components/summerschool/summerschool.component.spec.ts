import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummerschoolComponent } from './summerschool.component';

describe('SummerschoolComponent', () => {
  let component: SummerschoolComponent;
  let fixture: ComponentFixture<SummerschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummerschoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummerschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
