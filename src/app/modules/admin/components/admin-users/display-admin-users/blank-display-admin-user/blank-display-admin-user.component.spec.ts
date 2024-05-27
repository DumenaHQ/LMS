import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayAdminUserComponent } from './blank-display-admin-user.component';

describe('BlankDisplayAdminUserComponent', () => {
  let component: BlankDisplayAdminUserComponent;
  let fixture: ComponentFixture<BlankDisplayAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayAdminUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
