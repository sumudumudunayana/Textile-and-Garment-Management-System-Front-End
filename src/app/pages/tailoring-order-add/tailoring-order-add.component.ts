import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

type NumOrNull = number | null;

@Component({
  selector: 'app-tailoring-order-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './tailoring-order-add.component.html',
  styleUrls: ['./tailoring-order-add.component.css'],
})
export class TailoringOrderAddComponent {
  today = new Date().toISOString().slice(0, 10);

  private readonly UNIT_PRICE: Record<string, number> = {
    Cotton: 2000,
    Silk: 1500,
    Wool: 2500,
    Linen: 3000,
    Denim: 4500,
  };

  private readonly EMPTY = {
    customerId: null as NumOrNull,
    customerName: '',
    deliveryDate: '',
    fabricType: '',
    quantity: null as NumOrNull,
    totalAmount: null as NumOrNull,
    length: null as NumOrNull,
    width: null as NumOrNull,
    status: '',
  };

  public tailoringOrder = { ...this.EMPTY };

  recalcTotal(): void {
    const fabric = this.tailoringOrder.fabricType;
    const qty = Number(this.tailoringOrder.quantity || 0);

    const unit = this.UNIT_PRICE[fabric] ?? 0;
    const total = unit * (isNaN(qty) ? 0 : qty);

    this.tailoringOrder.totalAmount = Number.isFinite(total) ? Number(total.toFixed(2)) : 0;
  }

  async addTailoringOrder(form: NgForm) {
    const name = (this.tailoringOrder.customerName || '').trim();
    const fabric = (this.tailoringOrder.fabricType || '').trim();
    const date = (this.tailoringOrder.deliveryDate || '').trim();

    const customerIdNum = Number(this.tailoringOrder.customerId);
    const qtyNum = Number(this.tailoringOrder.quantity);
    const lenNum = Number(this.tailoringOrder.length);
    const widNum = Number(this.tailoringOrder.width);

    this.recalcTotal();
    const total = Number(this.tailoringOrder.totalAmount ?? 0);

    if (!customerIdNum || !name || !fabric || !date || !this.tailoringOrder.status) {
      alert('Please fill in all required fields.');
      return;
    }

    if ([customerIdNum, qtyNum, lenNum, widNum].some(n => isNaN(n) || n <= 0)) {
      alert('Customer ID, Quantity, Length, and Width must be numbers greater than 0.');
      return;
    }

    if (date < this.today) {
      alert('Delivery date cannot be in the past.');
      return;
    }

    if (!Number.isFinite(total) || total <= 0) {
      alert('Total amount is invalid. Check fabric type and quantity.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/tailoring_order/add-tailoring-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: customerIdNum,
          customerName: name,
          deliveryDate: date,
          fabricType: fabric,
          quantity: qtyNum,
          totalAmount: total,       
          length: lenNum,
          width: widNum,
          status: this.tailoringOrder.status,
        }),
      });

      if (!response.ok) throw new Error('Failed to add tailoring order');

      alert('Tailoring order added successfully!');

      form.resetForm(this.EMPTY);
      this.tailoringOrder = { ...this.EMPTY };
      return;

    } catch (error) {
      console.error('Error:', error);
      alert('Error adding tailoring order');
    }
  }

  clearFields() {
    this.tailoringOrder.customerId = null;
    this.tailoringOrder.customerName = '';
    this.tailoringOrder.deliveryDate = '';
    this.tailoringOrder.fabricType = '';
    this.tailoringOrder.quantity = null;
    this.tailoringOrder.totalAmount = null;
    this.tailoringOrder.length = null;
    this.tailoringOrder.width = null;
    this.tailoringOrder.status = '';
  }
}
