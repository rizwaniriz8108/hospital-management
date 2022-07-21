import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalDetailsComponent } from './vital-details.component';

describe('VitalDetailsComponent', () => {
  let component: VitalDetailsComponent;
  let fixture: ComponentFixture<VitalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
