import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargePlanComponent } from './recharge_plan.component';

describe('RechargePlanComponent', () => {
  let component: RechargePlanComponent;
  let fixture: ComponentFixture<RechargePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechargePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechargePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
