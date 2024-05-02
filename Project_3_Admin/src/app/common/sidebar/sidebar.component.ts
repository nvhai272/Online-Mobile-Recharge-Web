import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, HeaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarItems: SidebarItem[] = [
    { text: 'Dashboard', active:'nav-link text-white' ,icon: 'dashboard', link: '/', selected: false },
    { text: 'Services', active:'nav-link text-white',icon: 'contactless', link: '/services', selected: false },
    { text: 'Payment Methods', active:'nav-link text-white',icon: 'payment', link: '/payment-methods', selected: false },
    { text: 'Operators', active:'nav-link text-white', icon: 'store', link: '/operators', selected: false },
    { text: 'Feedbacks', active:'nav-link text-white', icon: 'chat', link: '/feedbacks', selected: false }
  ];
  onItemClick(item: SidebarItem) {
    // Deselect all items
    this.sidebarItems.forEach(i => i.selected = false);
    // Set the clicked item as selected
    item.selected = true;
  }
  onItemSelected(item: SidebarItem){
    item.active = "nav-link text-white active bg-gradient-primary";
  }
}
interface SidebarItem {
  text: string;
  icon : string;
  active: string;
  link?: string; // Optional for navigation
  selected: boolean;
}


