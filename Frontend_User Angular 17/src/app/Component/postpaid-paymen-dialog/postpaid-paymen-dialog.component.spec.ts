import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpaidPaymenDialogComponent } from './postpaid-paymen-dialog.component';

describe('PostpaidPaymenDialogComponent', () => {
  let component: PostpaidPaymenDialogComponent;
  let fixture: ComponentFixture<PostpaidPaymenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostpaidPaymenDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostpaidPaymenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
