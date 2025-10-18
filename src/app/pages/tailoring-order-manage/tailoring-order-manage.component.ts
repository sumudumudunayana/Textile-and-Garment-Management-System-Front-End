import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tailoring-order-manage',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './tailoring-order-manage.component.html',
  styleUrl: './tailoring-order-manage.component.css'
})
export class TailoringOrderManageComponent {
  id: any;
    public tailoringOrderInfo: any = {};
    public updatedTailoringOrderInfo: any = {};
  
    ngOnInit(): void {}
  
    async getTailoringOrderInfo() {
      if (!this.id) {
        alert("Please enter a valid tailoring order ID.");
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/tailoring_order/search-by-id/${this.id}`);
        if (!response.ok) {
          throw new Error("product not found or an error occurred.");
        }
        this.tailoringOrderInfo = await response.json();
        this.updatedTailoringOrderInfo = { ...this.tailoringOrderInfo }; 
        console.log(this.tailoringOrderInfo);
      } catch (error) {
        console.error("Error fetching tailoring order info:", error);
        alert("Error finding tailoring order info. Please check the ID and try again.");
      }
    }
  
    async updateTailoringOrder() {
      try {
        let response = await fetch('http://localhost:8080/tailoring_order/update-tailoring-order', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.updatedTailoringOrderInfo)
        });
  
        if (!response.ok) {
          throw new Error("Error updating tailoring order.");
        }
  
        alert("Tailoring order updated successfully!");
        this.getTailoringOrderInfo(); 
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating tailoring order. Please try again.");
      }
    }
  
    async deleteTailoringOrder() {
      if (!confirm("Are you sure you want to delete this tailoring order?")) {
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/tailoring_order/delete-by-id/${this.id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error("Error deleting tailoring order.");
        }
  
        alert("Tailoring order deleted successfully!");
        this.tailoringOrderInfo = {}; 
        this.id = null; 
      } catch (error) {
        console.error("Error deleting tailoring order:", error);
        alert("Error deleting tailoring order. Please try again.");
      }
    }
}
