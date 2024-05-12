import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recharge_plan } from '../../../type';
import { Recharge_planService } from '../../services/recharg_plan';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailPageComponent } from '../detail-page/detail-page.component';
import { PostpaidPaymenDialogComponent } from '../postpaid-paymen-dialog/postpaid-paymen-dialog.component';

@Component({
  selector: 'app-recharge_plan',
  standalone: true,
  imports: [RouterLink, CommonModule, MatTabsModule, FormsModule, DetailPageComponent, MatDialogModule],
  templateUrl: './recharge_plan.component.html',
  styleUrl: './recharge_plan.component.css'
})
export class RechargePlanComponent {
  activeNavItem: string = 'Mobile'; // Set initial active navigation item

  setActiveNavItem(navItem: string): void {
    this.activeNavItem = navItem;
  }

  selectedPlan: Recharge_plan | null = null;
  selectPlan(plan: Recharge_plan) {
    this.selectedPlan = plan;

  }

  hideTab: boolean = false;
  selectedTabIndex: number = 0;
  toggleTabVisibility() {
    this.hideTab = !this.hideTab;
    // Optionally, you can reset the selected tab index when hiding the tab
    if (this.hideTab) {
      this.selectedTabIndex = -1;
    }
  }
  recharge_plans?: Recharge_plan[];
  currentRecharge: Recharge_plan = {
    name: '',
    talkTime: 0,
    validity: 0,
    price: 0,
    description: ''
  };
  currentIndex = -1;
  constructor(private recharg_plan: Recharge_planService, private dialog: MatDialog, private router: Router) { }
  ngOnInit(): void {
    // getRecharge():void{
    this.recharg_plan.getAll()
      .subscribe(
        {
          next: (data) => {
            this.recharge_plans = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        }
      );

  }
  getPlansByType(type: string): Recharge_plan[] {
    if (!this.recharge_plans) return [];
    return this.recharge_plans.filter(plan => plan.rechargePlanTypeName === type);
  }

  setActiveRecharge(recharge_plan: Recharge_plan, index: number): void {
    this.currentRecharge = recharge_plan;
    this.currentIndex = index;
  }

  // refreshList(): void {
  //   this.get();
  //   this.currentRecharge = {
  //     name: '',
  //     talkTime: 0,
  //     validity: 0,
  //     price: 0,
  //     description: ''
  //   };
  //   this.currentIndex = -1;
  // }
  navigateToDetailPage(planId?: number): void {
    this.router.navigate(['/detail', planId]); // Assuming '/detail/:id' is the route for the detail page
  }

  openPostpaidPaymentDialog() {
    const dialogRef = this.dialog.open(PostpaidPaymenDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog closure (optional)
    });
  }
  
}









