import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRechargePlanComponent } from './edit-recharge-plan.component';

describe('EditRechargePlanComponent', () => {
  let component: EditRechargePlanComponent;
  let fixture: ComponentFixture<EditRechargePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRechargePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRechargePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
