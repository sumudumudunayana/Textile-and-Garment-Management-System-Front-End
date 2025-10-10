import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-manage',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './inventory-manage.component.html',
  styleUrl: './inventory-manage.component.css'
})
export class InventoryManageComponent {
  id: any;
    public productInfo: any = {};
    public updatedProductInfo: any = {};
  
    ngOnInit(): void {}
  
    async getProductInfo() {
      if (!this.id) {
        alert("Please enter a valid product ID.");
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/inventory/search-by-id/${this.id}`);
        if (!response.ok) {
          throw new Error("product not found or an error occurred.");
        }
        this.productInfo = await response.json();
        this.updatedProductInfo = { ...this.productInfo }; 
        console.log(this.productInfo);
      } catch (error) {
        console.error("Error fetching product info:", error);
        alert("Error finding product info. Please check the ID and try again.");
      }
    }
  
    async updateProduct() {
      try {
        let response = await fetch('http://localhost:8080/inventory/update-inventory', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.updatedProductInfo)
        });
  
        if (!response.ok) {
          throw new Error("Error updating product.");
        }
  
        alert("product updated successfully!");
        this.getProductInfo(); 
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again.");
      }
    }
  
    async deleteProduct() {
      if (!confirm("Are you sure you want to delete this product?")) {
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/inventory/delete-by-id/${this.id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error("Error deleting product.");
        }
  
        alert("product deleted successfully!");
        this.productInfo = {}; 
        this.id = null; 
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product. Please try again.");
      }
    }
}
