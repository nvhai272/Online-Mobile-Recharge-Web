import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,
    CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl('')

  });
  submitted = false;

  constructor(private uService: UserService,private toastr: ToastrService, private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        password: ['', Validators.required],
        phone: ['', Validators.required],
        email: [''],
        dob: [''],
        address: ['']
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  create() {
    // var inputdata = {
    //   name: this.name,
    //   phone: this.phone,
    //   password: this.password,
    //   email: this.email,
    //   dob: this.dob,
    //   address: this.address
    // }

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    this.uService.createUser(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.form.reset();
      },
      error: (error) => console.log('Error fetching user', error)
    })

    this.router.navigate(['/users']);
    this.showSuccess();
  }

  showSuccess(){
    this. toastr.success('Saved successfully.', 'Success');
  }
}
