import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RechargePlanService } from '../../Services/recharge-plan.service';
import { Operator, RechargePlanType } from '../../../types';
import { RechargePlanTypeService } from '../../Services/recharge-plan-type.service';

import { OperatorService } from '../../Services/operator.service';

@Component({
  selector: 'app-add-recharge-plan',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, FooterComponent, RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './add-recharge-plan.component.html',
  styleUrl: './add-recharge-plan.component.css'
})
export class AddRechargePlanComponent {

  types: RechargePlanType[];
  typeId: number;
  operators: Operator[];
  opId: number;

  constructor(private planService: RechargePlanService, private typeService: RechargePlanTypeService,
    private opService: OperatorService) { }
  name!: string
  talkTime!: number
  textMessageNumber!: number
  dataNumberTotal!: number
  dataNumberPerDay!: number
  validity!: number
  price!: number
  description!: string

  ngOnInit(): void {
    this.typeService.getRechargePlanTypes().subscribe({
      next: (res: any) => {
        this.types = res;
        console.log(this.types);
      },
      error: (error) => console.log('Error fetching type', error)

    });

    this.opService.getOperators().subscribe({
      next: (res: any) => {
        this.operators = res;
        console.log(this.operators);
      },
      error: (error) => console.log('Error fetching operator', error)
    });

  }
  create() {
    var inputdata = {
      name: this.name,
      talkTime: this.talkTime,
      textMessageNumber: this.textMessageNumber,
      dataNumberTotal: this.dataNumberTotal,
      dataNumberPerDay: this.dataNumberPerDay,
      validity: this.validity,
      price: this.price,
      description: this.description,
      rechargePlanTypeId: this.typeId,
      operatorId: this.opId
    }

    this.planService.createRechargePlan(inputdata).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error) => console.log('Error creating plan', error)
    })
  }
}
