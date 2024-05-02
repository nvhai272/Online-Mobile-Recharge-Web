import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recharge_plan } from '../../../type';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recharge_planService } from '../../services/recharg_plan';
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  @Input() plan: Recharge_plan | null = null; // Input property to receive plan data
  dynamicForm: FormGroup;
  recharge_plan: Recharge_plan;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,private activatedRoute: ActivatedRoute,private recharg_plan: Recharge_planService,) { }

  ngOnInit(): void {
    // Initialize form controls with selected plan data
    this.dynamicForm = this.fb.group({
      price: [this.data.plan?.price || '', Validators.required],
      talkTime: [this.data.plan?.talkTime || '', Validators.required],
      description: [this.data.plan?.description || '', Validators.required],
      validity: [this.data.plan?.validity || '', Validators.required],
      // additionalField: ['', Validators.required] // Additional field for user input
    });

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.recharg_plan.get(+params.get('id')!).subscribe(
        (result: any) => {
          console.log(result);
          this.recharge_plan = result;
        }
      );
    });
  }
  populateForm(plan: Recharge_plan): void {
    // Populate form fields with plan data
    this.dynamicForm.patchValue({
      // Assign form control values based on plan properties
      // For example:
      name: plan.name,
      description: plan.description,
      price: plan.price,
    });
  }

  onSubmit() {
    // Handle form submission
    console.log(this.dynamicForm.value);
    // You can now use this.dynamicForm.value to access form data
  

  }
}

