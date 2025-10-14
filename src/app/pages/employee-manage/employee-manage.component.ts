import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-manage',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './employee-manage.component.html',
  styleUrl: './employee-manage.component.css'
})
export class EmployeeManageComponent {
  id: any;
    public employeeInfo: any = {};
    public updatedEmployeeInfo: any = {};
  
    ngOnInit(): void {}
  
    async getEmployeeInfo() {
      if (!this.id) {
        alert("Please enter a valid employee ID.");
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/employee/search-by-id/${this.id}`);
        if (!response.ok) {
          throw new Error("employee not found or an error occurred.");
        }
        this.employeeInfo = await response.json();
        this.updatedEmployeeInfo = { ...this.employeeInfo }; 
        console.log(this.employeeInfo);
      } catch (error) {
        console.error("Error fetching employee info:", error);
        alert("Error finding employee info. Please check the ID and try again.");
      }
    }
  
    async updateEmployee() {
      try {
        let response = await fetch('http://localhost:8080/employee/update-employee', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.updatedEmployeeInfo)
        });
  
        if (!response.ok) {
          throw new Error("Error updating employee.");
        }
  
        alert("employee updated successfully!");
        this.getEmployeeInfo(); 
      } catch (error) {
        console.error("Error updating employee:", error);
        alert("Error updating employee. Please try again.");
      }
    }
  
    async deleteEmployee() {
      if (!confirm("Are you sure you want to delete this employee?")) {
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/employee/delete-by-id/${this.id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error("Error deleting employee.");
        }
  
        alert("employee deleted successfully!");
        this.employeeInfo = {}; 
        this.id = null; 
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee. Please try again.");
      }
    }
}
