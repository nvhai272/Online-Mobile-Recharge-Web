import { Component } from '@angular/core';
import { ServiceType } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceTypeService } from '../../Services/service-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-service-type',
  standalone: true,
  imports: [],
  templateUrl: './delete-service-type.component.html',
  styleUrl: './delete-service-type.component.css'
})
export class DeleteServiceTypeComponent {

  targetUrl: string = '/services';

  id!: any;
  isDeleted: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private typeService: ServiceTypeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    var inputData = {
      isDeleted: this.isDeleted
    };

    this.typeService.deleteService(this.id, inputData).subscribe({
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
