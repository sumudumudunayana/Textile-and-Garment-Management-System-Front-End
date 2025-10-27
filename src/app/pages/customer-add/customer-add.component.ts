import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent {
  public customer: any = {
    customerFirstName: '',
    customerLastName: '',
    customerAddress: '',
    customerEmail: '',
    customerPhoneNumber: '',
  };

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  private phoneRegex = /^0\d{9}$/;

  async addCustomer(form: NgForm) {
    const first = this.customer.customerFirstName?.trim();
    const last = this.customer.customerLastName?.trim();
    const address = this.customer.customerAddress?.trim();
    const email = this.customer.customerEmail?.trim().toLowerCase();
    const phone = String(this.customer.customerPhoneNumber ?? '').replace(/[\s-]/g, '');

    if (!first || !last || !address || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }
    if (!this.emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!this.phoneRegex.test(phone)) {
      alert('Phone number must start with 0 and be 10 digits (e.g., 07XXXXXXXX).');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/customer/add-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerFirstName: first,
          customerLastName: last,
          customerAddress: address,
          customerEmail: email,
          customerPhoneNumber: phone,
        }),
      });

      if (!response.ok) throw new Error('Failed to add customer');

      alert('Customer added successfully!');

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try { await response.json(); } catch {}
      }

      form.resetForm({
        customerFirstName: '',
        customerLastName: '',
        customerAddress: '',
        customerEmail: '',
        customerPhoneNumber: '',
      });

      return;

    } catch (err) {
      console.error(err);
      alert('Error adding customer');
    }
  }
}
