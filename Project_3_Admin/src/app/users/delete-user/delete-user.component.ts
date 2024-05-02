import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  targetUrl: string = '/users';

  id!: any;
  isDeleted: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    var inputData = {
      isDeleted: this.isDeleted
    };

    this.userService.deleteUser(this.id, inputData).subscribe({
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