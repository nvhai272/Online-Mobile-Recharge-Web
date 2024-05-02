import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../Services/operator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-operator',
  standalone: true,
  imports: [],
  templateUrl: './delete-operator.component.html',
  styleUrl: './delete-operator.component.css'
})
export class DeleteOperatorComponent {

  targetUrl: string = '/operators';

  id!: any;
  isDeleted: boolean = true;

  constructor(private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute, private opService: OperatorService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    var inputData = {
      isDeleted: this.isDeleted
    };

    this.opService.deleteOperator(this.id, inputData).subscribe({
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
