import { Component } from '@angular/core';
import { ServiceTypeService } from '../../Services/service-type.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceType } from '../../../types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-service-type',
  standalone: true,
  imports: [ NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule, FormsModule],
  templateUrl: './edit-service-type.component.html',
  styleUrl: './edit-service-type.component.css'
})
export class EditServiceTypeComponent {

  service: ServiceType; 
  id!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serService: ServiceTypeService,
    private toastr: ToastrService, private router: Router
  ) {}

  edit(): void {
    const inputData = {
      name: this.service.name,
      description: this.service.description
    };
    this.serService.updateService(this.id, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
    this.router.navigate(['/services']);
    this.showSuccess();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.serService.getService(this.id).subscribe(
      (result: ServiceType) => {
        console.log(result);
        this.service = result; 
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }

  showSuccess(){
    this. toastr.success('Edited successfully.', 'Success');
  }
}
