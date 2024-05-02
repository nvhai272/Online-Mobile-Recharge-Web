import { Component } from '@angular/core';
import { RechargePlanTypeService } from '../../Services/recharge-plan-type.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
  selector: 'app-create-recharge-plan-type',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,NavbarComponent, RouterLink, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './create-recharge-plan-type.component.html',
  styleUrl: './create-recharge-plan-type.component.css'
})
export class CreateRechargePlanTypeComponent {

  constructor(private typeService: RechargePlanTypeService) {
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
    this.typeService.createRechargePlanType(inputdata).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error) => console.log('Error fetching user', error)
    })
  }
}
