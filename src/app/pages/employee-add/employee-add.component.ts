import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent {
  public employee: any = {
    employeeName: '',
    employeeAddress: '',
    employeeEmail: '',
    employeePhoneNumber: '',
  };

  async addEmployee() {
    try {
      let response = await fetch(
        'http://localhost:8080/employee/add-employee',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employeeName: this.employee.employeeName,
            employeeAddress: this.employee.employeeAddress,
            employeeEmail: this.employee.employeeEmail,
            employeePhoneNumber: this.employee.employeePhoneNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      alert('employee added successfully');
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearFields() {
    this.employee = {
      employeeName: '',
      employeeAddress: '',
      employeeEmail: '',
      employeePhoneNumber: '',
    };
  }
}
