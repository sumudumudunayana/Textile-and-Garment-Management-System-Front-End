import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tailoring-order-view',
  standalone: true,
  imports: [NavbarComponent, NgFor, FormsModule, CommonModule],
  templateUrl: './tailoring-order-view.component.html',
  styleUrl: './tailoring-order-view.component.css'
})
export class TailoringOrderViewComponent {
  ngOnInit(): void {
    this.getTailoringOrderInfo();
  }

  public tailoringOrderInfo:any = []

  async getTailoringOrderInfo() {
    let response = await fetch("http://localhost:8080/tailoring_order/get-all");
    let body = await response.json();
    this.tailoringOrderInfo = body;
    console.log(this.tailoringOrderInfo);
    
  }
}
