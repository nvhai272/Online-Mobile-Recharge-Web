import { Component, OnInit } from '@angular/core';
import { OperatorService } from '../../Services/operator.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-operator',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, CommonModule, FooterComponent, NavbarComponent, 
    HeaderComponent, FormsModule],
  templateUrl: './create-operator.component.html',
  styleUrl: './create-operator.component.css'
})
export class CreateOperatorComponent implements OnInit {

  constructor(private router: Router,private formBuilder: FormBuilder, private toastr: ToastrService, 
    private opService: OperatorService) {
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });
  submitted = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['']
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    this.opService.createOperator(formData)
      .subscribe({
        next: (response) => {
          console.log('Operator created successfully!', response);
          this.form.reset();
        },
        error: (err) => {
          console.error('Error creating operator:', err);
        }
      });
      this.router.navigate(['/operators']);
      this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Saved successfully.', 'Success');
  }
  showError() {
    this.toastr.error('Error creating operator', 'Error');
  }
}
