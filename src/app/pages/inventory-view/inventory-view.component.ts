import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-view',
  standalone: true,
  imports: [NavbarComponent, NgFor, FormsModule, CommonModule],
  templateUrl: './inventory-view.component.html',
  styleUrl: './inventory-view.component.css'
})
export class InventoryViewComponent {
  ngOnInit(): void {
    this.getProductInfo();
  }

  public productInfo:any = []

  async getProductInfo() {
    let response = await fetch("http://localhost:8080/inventory/get-all");
    let body = await response.json();
    this.productInfo = body;
    console.log(this.productInfo);
    
  }
}
