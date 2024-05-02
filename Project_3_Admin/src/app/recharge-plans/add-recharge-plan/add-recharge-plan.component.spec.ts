import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRechargePlanComponent } from './add-recharge-plan.component';

describe('AddRechargePlanComponent', () => {
  let component: AddRechargePlanComponent;
  let fixture: ComponentFixture<AddRechargePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRechargePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRechargePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
