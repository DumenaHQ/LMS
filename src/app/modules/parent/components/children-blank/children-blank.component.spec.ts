import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenBlankComponent } from './children-blank.component';

describe('ChildrenBlankComponent', () => {
  let component: ChildrenBlankComponent;
  let fixture: ComponentFixture<ChildrenBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenBlankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
