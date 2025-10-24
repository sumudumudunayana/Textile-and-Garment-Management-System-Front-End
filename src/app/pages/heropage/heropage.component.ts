import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


declare const bootstrap: any;

@Component({
  selector: 'app-heropage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './heropage.component.html',
  styleUrl: './heropage.component.css'
})

export class HeropageComponent {
  username: string = "";
  password: string = "";
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

   private closeLoginModalAndCleanup() {
    const modalEl = document.getElementById('Admin-modal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      const instance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalEl.addEventListener('hidden.bs.modal', () => {
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
        document.body.classList.remove('modal-open');
      }, { once: true });
      instance.hide();
    } else {
      document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
      document.body.classList.remove('modal-open');
    }
  }

  login() {
    if (!this.username || !this.password) return;
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        const role = this.auth.role;
        this.closeLoginModalAndCleanup();
        if (role === 'Sales Rep') this.router.navigateByUrl('/sales-dashboard');
        else if (role === 'HR Officer') this.router.navigateByUrl('/HR-dashboard');
        else this.router.navigateByUrl('/dashboard');
      },
      error: () => alert('Invalid username or password'),
      complete: () => this.loading = false
    });
  }
}
