import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-sales-rep',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './dashboard-sales-rep.component.html',
  styleUrl: './dashboard-sales-rep.component.css'
})
export class DashboardSalesRepComponent {

}
