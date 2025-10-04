import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [NavbarComponent, NgFor, FormsModule, CommonModule],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.css'
})
export class CustomerViewComponent {
  ngOnInit(): void {
    this.getCustomerInfo();
  }

  public customerInfo:any = []

  async getCustomerInfo() {
    let response = await fetch("http://localhost:8080/customer/get-all");
    let body = await response.json();
    this.customerInfo = body;
    console.log(this.customerInfo);
    
  }
}
