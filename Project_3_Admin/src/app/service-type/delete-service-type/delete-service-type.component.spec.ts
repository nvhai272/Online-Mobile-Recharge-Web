import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceTypeComponent } from './delete-service-type.component';

describe('DeleteServiceTypeComponent', () => {
  let component: DeleteServiceTypeComponent;
  let fixture: ComponentFixture<DeleteServiceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteServiceTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
