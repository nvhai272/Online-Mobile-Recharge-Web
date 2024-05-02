import { Component } from '@angular/core';
import { Operator, RechargePlan, RechargePlanType } from '../../../types';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { RechargePlanService } from '../../Services/recharge-plan.service';
import { RechargePlanTypeService } from '../../Services/recharge-plan-type.service';
import { OperatorService } from '../../Services/operator.service';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-recharge-plan',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent,FooterComponent, RouterLink, 
    RouterOutlet,CommonModule, FormsModule],
  templateUrl: './edit-recharge-plan.component.html',
  styleUrl: './edit-recharge-plan.component.css'
})
export class EditRechargePlanComponent {

  plan: RechargePlan;
  id!: any;
  types: RechargePlanType[];
  typeId: number;
  operators: Operator[];
  opId: number;

  constructor(private activatedRoute: ActivatedRoute, private planService: RechargePlanService, 
    private typeService: RechargePlanTypeService, private opService: OperatorService) { }

  name!: string
  talkTime!: number
  textMessageNumber!: number
  dataNumberTotal!: number
  dataNumberPerDay!: number
  validity!: number
  price!: number
  description!: string

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    this.planService.getRechargePlan(this.id).subscribe(
      (result: any) => {
        this.plan = result
        this.typeId = this.plan.rechargePlanTypeId
        this.opId = this.plan.operatorId
      }
    )
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

  edit() {
    var inputdata = {
      name: this.plan.name,
      talkTime: this.plan.talkTime,
      textMessageNumber: this.plan.textMessageNumber,
      dataNumberTotal: this.plan.dataNumberTotal,
      dataNumberPerDay: this.plan.dataNumberPerDay,
      validity: this.plan.validity,
      price: this.plan.price,
      description: this.plan.description,
      rechargePlanTypeId: this.typeId,
      operatorId: this.opId
    }

    this.planService.updateRechargePlan(this.id,inputdata).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error) => console.log('Error creating plan', error)
    })
  }
}
