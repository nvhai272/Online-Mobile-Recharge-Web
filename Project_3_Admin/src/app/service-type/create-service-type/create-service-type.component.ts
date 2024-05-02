import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ServiceTypeService } from '../../Services/service-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-service-type',
  standalone: true,
  imports: [RouterLink,RouterOutlet, CommonModule, FooterComponent, NavbarComponent, HeaderComponent, FormsModule],
  templateUrl: './create-service-type.component.html',
  styleUrl: './create-service-type.component.css'
})
export class CreateServiceTypeComponent implements OnInit{

  constructor(private serService: ServiceTypeService, private toastr: ToastrService, private router: Router) {
  }
  name!: string
  description!: string

  ngOnInit(): void {

  }
  create() {
    var inputdata = {
      name: this.name,
      description: this.description
    }
    this.serService.createService(inputdata).subscribe({
      next: (res: any) => {
      
        console.log(res);

      },
      error: (error) => console.log('Error fetching user', error)
    })
    this.router.navigate(['/services']);
    this.showSuccess();
  }

  showSuccess(){
    this. toastr.success('Saved successfully.', 'Success');
  }
}
