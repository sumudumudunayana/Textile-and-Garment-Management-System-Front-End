import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer-manage',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './customer-manage.component.html',
  styleUrl: './customer-manage.component.css'
})
export class CustomerManageComponent {
  id: any;
    public customerInfo: any = {};
    public updatedCustomerInfo: any = {};
  
    ngOnInit(): void {}
  
    async getCustomerInfo() {
      if (!this.id) {
        alert("Please enter a valid customer ID.");
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/customer/search-by-id/${this.id}`);
        if (!response.ok) {
          throw new Error("customer not found or an error occurred.");
        }
        this.customerInfo = await response.json();
        this.updatedCustomerInfo = { ...this.customerInfo }; 
        console.log(this.customerInfo);
      } catch (error) {
        console.error("Error fetching customer info:", error);
        alert("Error finding customer info. Please check the ID and try again.");
      }
    }
  
    async updateCustomer() {
      try {
        let response = await fetch('http://localhost:8080/customer/update-customer', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.updatedCustomerInfo)
        });
  
        if (!response.ok) {
          throw new Error("Error updating customer.");
        }
  
        alert("employee updated successfully!");
        this.getCustomerInfo(); 
      } catch (error) {
        console.error("Error updating customer:", error);
        alert("Error updating customer. Please try again.");
      }
    }
  
    async deleteCustomer() {
      if (!confirm("Are you sure you want to delete this customer?")) {
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/customer/delete-by-id/${this.id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error("Error deleting customer.");
        }
  
        alert("customer deleted successfully!");
        this.customerInfo = {}; 
        this.id = null; 
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Error deleting customer. Please try again.");
      }
    }
}
