import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  public employee: any = {
    employeeName: '',
    employeeAddress: '',
    employeeEmail: '',
    employeePhoneNumber: '',
  };

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  private phoneRegex = /^0\d{9}$/;

  async addEmployee(form: NgForm) {
    const name = this.employee.employeeName?.trim();
    const address = this.employee.employeeAddress?.trim();
    const email = this.employee.employeeEmail?.trim().toLowerCase();
    const phone = String(this.employee.employeePhoneNumber ?? '').replace(/[\s-]/g, '');

    if (!name || !address || !email || !phone) {
      alert('Please fill in all fields (Name, Address, Email, Phone).');
      return;
    }

    if (!this.emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!this.phoneRegex.test(phone)) {
      alert('Phone number must be 10 digits and start with 0 (e.g., 07XXXXXXXX).');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/employee/add-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName: name,
          employeeAddress: address,
          employeeEmail: email,
          employeePhoneNumber: phone,
        }),
      });

      if (!response.ok) throw new Error('Failed to add employee');

      alert('Employee added successfully!');

      form.resetForm({
        employeeName: '',
        employeeAddress: '',
        employeeEmail: '',
        employeePhoneNumber: '',
      });

      this.employee.employeeName = '';
      this.employee.employeeAddress = '';
      this.employee.employeeEmail = '';
      this.employee.employeePhoneNumber = '';

      return;  

    } catch (error) {
      console.error('Error:', error);
      alert('Error adding employee');
    }
  }

  clearFields() {
    this.employee.employeeName = '';
    this.employee.employeeAddress = '';
    this.employee.employeeEmail = '';
    this.employee.employeePhoneNumber = '';
  }
}
