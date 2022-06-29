import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentOverviewComponent } from './parent-overview.component';

describe('ParentOverviewComponent', () => {
  let component: ParentOverviewComponent;
  let fixture: ComponentFixture<ParentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
