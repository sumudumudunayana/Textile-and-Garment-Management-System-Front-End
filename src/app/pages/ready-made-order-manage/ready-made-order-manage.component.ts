import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface OrderItem {
  productId: number;
  itemName: string;
  itemPrice: number;
  quantity: number;
  lineTotal: number;
}

interface ReadyMadeOrderVM {
  readyMadeOrderId: number;
  customerId: number;
  customerName: string;
  date: string | Date;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  items: OrderItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-ready-made-order-manage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './ready-made-order-manage.component.html',
  styleUrl: './ready-made-order-manage.component.css'
})
export class ReadyMadeOrderManageComponent implements OnInit {

  orders: ReadyMadeOrderVM[] = [];
  grandTotal = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders() {
    this.http.get<ReadyMadeOrderVM[]>('http://localhost:8080/readyMadeOrder/get-detailed')
      .subscribe({
        next: (res) => {
          this.orders = res.map(o => ({
            ...o,
            id: o.readyMadeOrderId, // to keep compatibility with HTML template
            total: o.totalAmount,
            expanded: false
          }));
          this.computeGrandTotal();
        },
        error: err => {
          console.error('Failed to fetch orders', err);
          alert('Failed to load orders from the server.');
        }
      });
  }

  toggle(o: ReadyMadeOrderVM) {
    o.expanded = !o.expanded;
  }

  delete(o: ReadyMadeOrderVM) {
    const ok = confirm(`Delete order #${o.readyMadeOrderId}?`);
    if (!ok) return;

    this.http.delete(`http://localhost:8080/readyMadeOrder/delete-by-id/${o.readyMadeOrderId}`)
      .subscribe({
        next: () => {
          this.orders = this.orders.filter(x => x.readyMadeOrderId !== o.readyMadeOrderId);
          this.computeGrandTotal();
          alert(`Order #${o.readyMadeOrderId} deleted.`);
        },
        error: err => {
          console.error(err);
          alert('Failed to delete order.');
        }
      });
  }

  trackByOrderId = (_: number, o: ReadyMadeOrderVM) => o.readyMadeOrderId;

  private computeGrandTotal() {
    this.grandTotal = this.orders.reduce((s, o) => s + o.totalAmount, 0);
  }
}
