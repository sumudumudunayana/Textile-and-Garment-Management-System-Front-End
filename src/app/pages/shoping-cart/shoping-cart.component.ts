import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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
  selector: 'app-shoping-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FormsModule, HttpClientModule],
  templateUrl: './shoping-cart.component.html',
  styleUrl: './shoping-cart.component.css'
})
export class ShopingCartComponent implements OnInit {
  items: CartItem[] = [];
  itemCount = 0;

  company = {
    name: 'Textile & Garment Manager',
    address: 'Negombo, Sri Lanka',
    phone: '+94 77 123 4567',
    email: 'info@example.com'
  };

  customerId: number | null = null;
  customerName = '';
  discountOptions = [0, 5, 10, 20, 50];
  selectedDiscount = 0;

  subtotal = 0;
  discountAmount = 0;
  total = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.load();

    const savedDisc = Number(localStorage.getItem('cart_discount') || '0');
    if (this.discountOptions.includes(savedDisc)) {
      this.selectedDiscount = savedDisc;
      this.recalcTotals();
    }

    const cust = this.readCustomer();
    if (cust) {
      this.customerId = cust.id;
      this.customerName = cust.name;
    }
  }

  inc(productId: number) {
    const it = this.items.find(i => i.product.id === productId);
    if (!it) return;
    it.qty += 1;
    it.lineTotal = this.round2(it.qty * it.product.price);
    this.persist();
  }

  dec(productId: number) {
    const it = this.items.find(i => i.product.id === productId);
    if (!it) return;
    it.qty = Math.max(1, it.qty - 1);
    it.lineTotal = this.round2(it.qty * it.product.price);
    this.persist();
  }

  setQty(productId: number, val: any) {
    const n = Math.max(1, Number(val) || 1);
    const it = this.items.find(i => i.product.id === productId);
    if (!it) return;
    it.qty = n;
    it.lineTotal = this.round2(it.qty * it.product.price);
    this.persist();
  }

  remove(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.persist();
  }

  applyDiscount(percent: number) {
    this.selectedDiscount = percent;
    localStorage.setItem('cart_discount', String(percent));
    this.recalcTotals();
  }

  checkout() {
  const payload = {
    customerId: this.customerId,
    customerName: this.customerName,
    items: this.items.map(i => ({
      productId: i.product.id,
      name: i.product.name,
      unitPrice: i.product.price,
      qty: i.qty,
      lineTotal: i.lineTotal
    })),
    subtotal: this.subtotal,
    discountPercent: this.selectedDiscount,
    discountAmount: this.discountAmount,
    total: this.total,
    date: new Date().toISOString()
  };

  this.http.post('http://localhost:8080/readyMadeOrder/create-detailed', payload).subscribe({
    next: (res) => {
      console.log('Order saved:', res);

      // ✅ Generate Invoice PDF after saving to backend
      this.generateInvoicePDF(payload);

      localStorage.removeItem('cart');
      this.load();
      this.router.navigateByUrl('/dashboard');
    },
    error: (err) => {
      console.error('Order submission failed:', err);
      alert('Failed to save order to backend.');
    }
  });
}



private generateInvoicePDF(payload: {
  customerId: number | null;
  customerName: string;
  items: {
    productId: number;
    name: string;
    unitPrice: number;
    qty: number;
    lineTotal: number;
  }[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  date: string;
}) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 40;
  let y = 50;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(this.company.name, marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  y += 16;
  doc.text(`${this.company.address}`, marginX, y);
  y += 14;
  doc.text(`${this.company.phone}  |  ${this.company.email}`, marginX, y);

  const invNo = this.generateInvoiceNumber();
  const dateStr = new Date(payload.date).toLocaleString();
  y += 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('INVOICE', marginX, y);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${invNo}`, marginX, y + 16);
  doc.text(`Date: ${dateStr}`, marginX, y + 32);

  y += 56;
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`Customer ID: ${payload.customerId ?? '—'}`, marginX, y + 16);
  doc.text(`Customer Name: ${payload.customerName || '—'}`, marginX, y + 32);

  const tableBody = payload.items.map((it, idx) => [
    String(idx + 1),
    it.name,
    `LKR ${it.unitPrice.toLocaleString('en-LK', { maximumFractionDigits: 0 })}`,
    String(it.qty),
    `LKR ${it.lineTotal.toLocaleString('en-LK', { maximumFractionDigits: 0 })}`
  ]);

  autoTable(doc, {
    startY: y + 52,
    head: [['#', 'Item', 'Unit Price', 'Qty', 'Line Total']],
    body: tableBody,
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [79, 70, 229], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 250 },
      2: { cellWidth: 100, halign: 'right' },
      3: { cellWidth: 60, halign: 'center' },
      4: { cellWidth: 110, halign: 'right' }
    },
    margin: { left: marginX, right: marginX },
    theme: 'grid'
  });

  const finalY = (doc as any).lastAutoTable?.finalY || y + 52;
  const sumX = 300;
  let sy = finalY + 20;

  const line = (label: string, value: string, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(bold ? 12 : 11);
    doc.text(label, marginX + sumX, sy);
    doc.text(value, marginX + sumX + 180, sy, { align: 'right' });
    sy += 16;
  };

  line('Subtotal', `LKR ${payload.subtotal.toLocaleString('en-LK', { maximumFractionDigits: 0 })}`);
  line(`Discount (${payload.discountPercent}%)`, `- LKR ${payload.discountAmount.toLocaleString('en-LK', { maximumFractionDigits: 0 })}`);
  line('Total', `LKR ${payload.total.toLocaleString('en-LK', { maximumFractionDigits: 0 })}`, true);

  sy += 24;
  doc.setDrawColor(220);
  doc.line(marginX, sy, 555, sy);
  sy += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Thank you for your business!', marginX, sy);

  const fileName = `Invoice_${invNo}.pdf`;
  doc.save(fileName);
}


private generateInvoiceNumber(): string {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const rand = Math.floor(Math.random() * 900 + 100);
  return `INV-${stamp}-${rand}`;
}







  private load() {
    try { this.items = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]; }
    catch { this.items = []; }
    this.recalcTotals();
  }
  private persist() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.recalcTotals();
  }
  private recalcTotals() {
    this.subtotal = this.round2(this.items.reduce((s, i) => s + i.lineTotal, 0));
    this.itemCount = this.items.reduce((s, i) => s + i.qty, 0);
    this.discountAmount = this.round2(this.subtotal * (this.selectedDiscount / 100));
    this.total = this.round2(this.subtotal - this.discountAmount);
  }
  private round2(n: number) { return Math.round(n * 100) / 100; }

  private readCustomer(): { id: number | null; name: string } | null {
    try {
      const raw = localStorage.getItem('cart_customer');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}
