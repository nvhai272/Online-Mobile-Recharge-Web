import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostpaidPaymenDialogComponent } from '../postpaid-paymen-dialog/postpaid-paymen-dialog.component';
import { Router, NavigationEnd, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { currentUser } from '../../../type';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  isLoggedIn = false;
  name?: string;
  showNavbar: boolean = true;
  currentUser: currentUser;
  constructor(private dialog: MatDialog, private router: Router, private storageService: StorageService, 
    private authService: AuthService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check current route and set showNavbar accordingly
        this.showNavbar = !['/login', '/signup'].includes(event.url);
      }
    });
  }

  openPostpaidPaymentDialog() {
    const dialogRef = this.dialog.open(PostpaidPaymenDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.name = this.storageService.getUser().name;
    }

  }
  logout(): void {
    this.authService.logout();
    this.storageService.clean();

    window.location.reload();

  }
}
