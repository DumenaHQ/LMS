import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisplayAdminUsersComponent } from './list-display-admin-users.component';

describe('ListDisplayAdminUsersComponent', () => {
  let component: ListDisplayAdminUsersComponent;
  let fixture: ComponentFixture<ListDisplayAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDisplayAdminUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDisplayAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
