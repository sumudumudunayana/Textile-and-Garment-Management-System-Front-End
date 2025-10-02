// src/app/pages/ready-made-order-add/ready-made-order-add.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../common/navbar/navbar.component';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  product: Product;
  qty: number;
  lineTotal: number;
}

@Component({
  selector: 'app-ready-made-order-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './ready-made-order-add.component.html',
  styleUrl: './ready-made-order-add.component.css'
})
export class ReadyMadeOrderAddComponent implements OnInit {

  customerId: number | null = null;
  customerName = '';
  products: Product[] = [];
  qtyMap: Record<number, number> = {};
  cartCount = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    const saved = this.readCustomer();
    if (saved) {
      this.customerId = saved.id;
      this.customerName = saved.name;
    }
    this.refreshCartCount();
  }

  fetchProducts(): void {
    // 🔁 Mock data for now (replace with backend API if available)
    this.products = [
      { id: 1, name: 'Casual T-Shirt (Men)', price: 1850, imageUrl: '/T-shirt-men.jpg' },
      { id: 2, name: 'Polo Shirt (Unisex)', price: 2450, imageUrl: '/polo.webp' },
      { id: 3, name: 'Ladies Blouse', price: 2150, imageUrl: '/blouse.webp' },
      { id: 4, name: 'Denim Jeans', price: 5200, imageUrl: '/denim.jpg' },
      { id: 5, name: 'Kids Shorts', price: 1650, imageUrl: '/shorts.webp' },
      { id: 6, name: 'Sweater', price: 1250, imageUrl: '/sweter.jpg' },
      { id: 7, name: 'Cap', price: 2000, imageUrl: '/cap.jpg' },
      { id: 8, name: 'Jacket', price: 3550, imageUrl: '/jacket.avif' },
      { id: 9, name: 'Cargo Pants', price: 5200, imageUrl: '/cargopants.webp' },
      { id: 10, name: 'Blazer', price: 1650, imageUrl: '/blazer.jpg' },
    ];
    this.products.forEach(p => this.qtyMap[p.id] = 1);

    // Example for real API call (uncomment if you have backend):p
    /*
    this.http.get<Product[]>('http://localhost:8080/api/products').subscribe(data => {
      this.products = data;
      this.products.forEach(p => this.qtyMap[p.id] = 1);
    });
    */
  }

  inc(p: Product): void { this.qtyMap[p.id] = (this.qtyMap[p.id] ?? 1) + 1; }
  dec(p: Product): void { this.qtyMap[p.id] = Math.max(1, (this.qtyMap[p.id] ?? 1) - 1); }

  addToCart(p: Product): void {
    const qty = Math.max(1, this.qtyMap[p.id] ?? 1);
    const items = this.readCart();

    const idx = items.findIndex(i => i.product.id === p.id);
    if (idx > -1) {
      items[idx].qty += qty;
      items[idx].lineTotal = this.round2(items[idx].qty * items[idx].product.price);
    } else {
      items.push({ product: p, qty, lineTotal: this.round2(qty * p.price) });
    }

    this.writeCart(items);
    this.qtyMap[p.id] = 1;
    this.refreshCartCount();

    alert(`Added ${qty} × ${p.name} to cart.`);
  }

  private readCart(): CartItem[] {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]; }
    catch { return []; }
  }

  private writeCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private refreshCartCount(): void {
    const items = this.readCart();
    this.cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  }

  private round2(n: number): number {
    return Math.round(n * 100) / 100;
  }

  persistCustomer(): void {
    const payload = {
      id: this.customerId ? Number(this.customerId) : null,
      name: (this.customerName || '').trim()
    };
    localStorage.setItem('cart_customer', JSON.stringify(payload));
  }

  private readCustomer(): { id: number | null; name: string } | null {
    try {
      const raw = localStorage.getItem('cart_customer');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
