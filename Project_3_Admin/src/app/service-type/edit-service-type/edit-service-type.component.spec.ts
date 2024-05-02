import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceTypeComponent } from './edit-service-type.component';

describe('EditServiceTypeComponent', () => {
  let component: EditServiceTypeComponent;
  let fixture: ComponentFixture<EditServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
