import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RechargePlanService } from '../../Services/recharge-plan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-recharge-plan',
  standalone: true,
  imports: [],
  templateUrl: './delete-recharge-plan.component.html',
  styleUrl: './delete-recharge-plan.component.css'
})
export class DeleteRechargePlanComponent {

  targetUrl: string = '/recharge-plans';

  id!: any;
  isDeleted: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private planService: RechargePlanService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    var inputData = {
      isDeleted: this.isDeleted
    };

    this.planService.deleteRechargePlan(this.id, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });

    this.router.navigate([this.targetUrl]);
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Deleted successfully.', 'Success');
  }
}
