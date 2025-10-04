import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent {
  public customer: any = {
    customerFirstName: '',
    customerLastName: '',
    customerAddress: '',
    customerEmail: '',
    customerPhoneNumber: '',
  };

  async addCustomer() {
    try {
      let response = await fetch('http://localhost:8080/customer/add-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerFirstName: this.customer.customerFirstName,
          customerLastName: this.customer.customerLastName,
          customerAddress: this.customer.customerAddress,
          customerEmail: this.customer.customerEmail,
          customerPhoneNumber: this.customer.customerPhoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      alert('customer added successfully');
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearFields() {
    this.customer = {
      customerFirstName: '',
    customerLastName: '',
    customerAddress: '',
    customerEmail: '',
    customerPhoneNumber: '',
    };
  }
}
