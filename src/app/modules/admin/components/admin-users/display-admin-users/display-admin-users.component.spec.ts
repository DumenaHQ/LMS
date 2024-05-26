import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminUsersComponent } from './display-admin-users.component';

describe('DisplayAdminUsersComponent', () => {
  let component: DisplayAdminUsersComponent;
  let fixture: ComponentFixture<DisplayAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
