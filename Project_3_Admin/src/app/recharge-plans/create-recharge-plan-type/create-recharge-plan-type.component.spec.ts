import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRechargePlanTypeComponent } from './create-recharge-plan-type.component';

describe('CreateRechargePlanTypeComponent', () => {
  let component: CreateRechargePlanTypeComponent;
  let fixture: ComponentFixture<CreateRechargePlanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRechargePlanTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRechargePlanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
