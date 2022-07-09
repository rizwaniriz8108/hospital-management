import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUserRegistrationComponent } from './hospital-user-registration.component';

describe('HospitalUserRegistrationComponent', () => {
  let component: HospitalUserRegistrationComponent;
  let fixture: ComponentFixture<HospitalUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalUserRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
