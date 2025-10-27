import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

type NumOrNull = number | null;

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']  
})
export class InventoryAddComponent {
  private readonly EMPTY = {
    productName: '',
    productCategory: '',
    quantity: null as NumOrNull,
    price: null as NumOrNull,
    productEntryDate: '',
  };

  public inventory = { ...this.EMPTY };

  async addProduct(form: NgForm) {
    const name = (this.inventory.productName || '').trim();
    const category = (this.inventory.productCategory || '').trim();
    const date = (this.inventory.productEntryDate || '').trim();

    const quantityNum = Number(this.inventory.quantity);
    const priceNum = Number(this.inventory.price);

    if (!name || !category || !date || this.inventory.quantity == null || this.inventory.price == null) {
      alert('Please fill in all required fields.');
      return;
    }
    if (isNaN(quantityNum) || quantityNum <= 0) {
      alert('Quantity must be a number greater than 0.');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Price must be a number greater than 0.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/inventory/add-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: name,
          productCategory: category,
          quantity: quantityNum,
          price: priceNum,
          productEntryDate: date,
        }),
      });
      if (!response.ok) throw new Error('Failed to add product');

      alert('product added successfully');

      form.resetForm(this.EMPTY);

      this.inventory = { ...this.EMPTY };

    } catch (e) {
      console.error(e);
      alert('Error adding product');
    }
  }

  clearFields() {
    this.inventory.productName = '';
    this.inventory.productCategory = '';
    this.inventory.quantity = null;
    this.inventory.price = null;
    this.inventory.productEntryDate = '';
  }
}
