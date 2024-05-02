import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OperatorService } from '../../Services/operator.service';
import { Operator } from '../../../types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-operator',
  standalone: true,
  imports: [ NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule, FormsModule],
  templateUrl: './edit-operator.component.html',
  styleUrl: './edit-operator.component.css'
})
export class EditOperatorComponent implements OnInit {
  operator: Operator; // Initialize an empty Userss object
  id!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private opService: OperatorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  edit(): void {
    const inputData = {
      name: this.operator.name, // Ensure 'name' property exists in Userss interface
      description: this.operator.description
    };
    this.opService.updateOperator(this.id, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
    this.router.navigate(['/operators']);
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Edited successfully.', 'Success');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.opService.getOperator(this.id).subscribe(
      (result: Operator) => {
        console.log(result);
        this.operator = result; 
        console.log(this.operator)
        // Assign retrieved data to the Userss object
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }
}
