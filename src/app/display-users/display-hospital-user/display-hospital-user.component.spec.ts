import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHospitalUserComponent } from './display-hospital-user.component';

describe('DisplayHospitalUserComponent', () => {
  let component: DisplayHospitalUserComponent;
  let fixture: ComponentFixture<DisplayHospitalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayHospitalUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHospitalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
