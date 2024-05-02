import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceTypeComponent } from './create-service-type.component';

describe('CreateServiceTypeComponent', () => {
  let component: CreateServiceTypeComponent;
  let fixture: ComponentFixture<CreateServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
