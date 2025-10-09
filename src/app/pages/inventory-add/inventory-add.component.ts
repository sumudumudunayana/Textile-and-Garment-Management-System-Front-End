import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.css'
})
export class InventoryAddComponent {
  public inventory: any = {
    productName: '',
    productCategory: '',
    quantity: '',
    price: '',
    productEntryDate: '',
  };

  async addUser() {
    try {
      let response = await fetch('http://localhost:8080/inventory/add-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: this.inventory.productName,
          productCategory: this.inventory.productCategory,
          quantity: this.inventory.quantity,
          price: this.inventory.price,
          productEntryDate: this.inventory.productEntryDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      alert('user added successfully');
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearFields() {
    this.inventory = {
      productName: '',
    productCategory: '',
    quantity: '',
    price: '',
    productEntryDate: '',
    };
  }
}
