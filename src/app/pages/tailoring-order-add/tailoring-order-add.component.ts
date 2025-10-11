import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tailoring-order-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './tailoring-order-add.component.html',
  styleUrl: './tailoring-order-add.component.css',
})
export class TailoringOrderAddComponent {
  public tailoringOrder: any = {
    customerId: '',
    customerName: '',
    deliveryDate: '',
    fabricType: '',
    quantity: '',
    totalAmount: '',
    length: '',
    width: '',
    description: '',
    status: '',
  };

  async addTailoringOrder() {
    try {
      let response = await fetch(
        'http://localhost:8080/tailoring_order/add-tailoring-order',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerId: this.tailoringOrder.customerId,
            customerName: this.tailoringOrder.customerName,
            deliveryDate: this.tailoringOrder.deliveryDate,
            fabricType: this.tailoringOrder.fabricType,
            quantity: this.tailoringOrder.quantity,
            totalAmount: this.tailoringOrder.totalAmount,
            length: this.tailoringOrder.length,
            height: this.tailoringOrder.height,
            width: this.tailoringOrder.width,
            description: this.tailoringOrder.description,
            status: this.tailoringOrder.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add tailoring order');
      }

      alert('Tailoring order added successfully');
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearFields() {
    this.tailoringOrder = {
      customerId: '',
      customerName: '',
      deliveryDate: '',
      fabricType: '',
      quantity: '',
      totalAmount: '',
      length: '',
      height: '',
      width: '',
      description: '',
      status: '',
    };
  }
}
