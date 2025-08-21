import { CommonModule } from '@angular/common';
import { Component ,computed, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type Activity = { icon: string; text: string; time: string };
type StatCard = { label: string; value: number | string; icon: string; accent?: 'green'|'orange'|'blue'|'indigo' };

@Component({
  selector: 'app-dash-board',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css'
})
export class DashBoard {
  // ----- Topbar -----
  userName = 'Admin';

  // ----- Quick Stats -----
  statCards: StatCard[] = [
    { label: 'Total Customers', value: 1250, icon: '👥', accent: 'indigo' },
    { label: 'Tailoring Orders (Pending)', value: 25, icon: '🧵', accent: 'blue' },
    { label: 'Employees Present', value: 120, icon: '🧑‍💼', accent: 'green' },
    { label: 'Low Stock Alerts', value: 7, icon: '⚠️', accent: 'orange' },
  ];

  // ----- Charts Data -----
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  monthlyRevenue = signal<number[]>([120, 180, 210, 260, 240, 300, 380, 420, 415, 460, 500, 580]); // in LKR thousands
  attendance = signal<number[]>([18, 22, 30, 28, 20, 25, 29]); // Mon..Sun

  orderStatus = signal<{pending:number; processing:number; delivered:number}>({
    pending: 35, processing: 20, delivered: 45
  });

  // SVG path for revenue line
  revenuePath = computed(() => {
    const data = this.monthlyRevenue();
    const w = 300, h = 120, pad = 8;
    const max = Math.max(...data) * 1.1;
    const stepX = (w - pad * 2) / (data.length - 1);
    const scaleY = (val: number) => h - pad - (val / max) * (h - pad * 2);

    return data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${pad + i * stepX},${scaleY(v)}`).join(' ');
  });

  // Bars for attendance
  maxAttendance = computed(() => Math.max(...this.attendance(), 1));

  // CSS conic-gradient for donut
  donutGradient = computed(() => {
    const { pending, processing, delivered } = this.orderStatus();
    const total = pending + processing + delivered || 1;
    const p1 = (delivered / total) * 360;
    const p2 = p1 + (processing / total) * 360;
    // order: delivered -> processing -> pending
    return `conic-gradient(var(--c-green) 0 ${p1}deg, var(--c-blue) ${p1}deg ${p2}deg, var(--c-orange) ${p2}deg 360deg)`;
  });

  // ----- Recent Activity -----
  activities: Activity[] = [
    { icon: '🔁', text: 'Order #456 by John updated to Processing', time: '16 mins ago' },
    { icon: '🆕', text: 'New Customer Registered — Nadeesha Perera', time: '20 mins ago' },
    { icon: '📉', text: 'Stock Alert — Cotton White < 50 m', time: '1 hour ago' },
  ];

  // ----- Shortcuts -----
  shortcuts = [
    { icon: '➕', label: 'Add Customer' },
    { icon: '🧵', label: 'New Tailoring Order' },
    { icon: '💳', label: 'Record Sale' },
    { icon: '📑', label: 'Generate Report' },
  ];

  // ----- Sidebar -----
  sidebarOpen = signal<boolean>(true);
  toggleSidebar() { this.sidebarOpen.update(v => !v); }

  // rudimentary search handler
  searchQuery = '';
  onSearch() {
    if (!this.searchQuery.trim()) return;
    alert(`Search for: ${this.searchQuery}`);
  }

}
