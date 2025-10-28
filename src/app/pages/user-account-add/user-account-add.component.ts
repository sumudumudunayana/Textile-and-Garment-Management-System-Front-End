import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './user-account-add.component.html',
  styleUrls: ['./user-account-add.component.css'] 
})
export class UserAccountAddComponent {
  today = new Date().toISOString().slice(0, 10); 

  public user: any = {
    userName: '',
    userAddress: '',
    userEmail: '',
    userPhoneNumber: '',
    userDate: '',
    userRole: '', 
    userLoginName: '',
    userLoginPassword: ''
  };

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  private phoneRegex = /^0\d{9}$/;

  async addUser(form: NgForm) {
    const name  = this.user.userName?.trim();
    const addr  = this.user.userAddress?.trim();
    const email = this.user.userEmail?.trim().toLowerCase();
    const phone = String(this.user.userPhoneNumber ?? '').replace(/[\s-]/g, '');
    const date  = this.user.userDate;
    const role  = this.user.userRole;
    const uname = this.user.userLoginName?.trim();
    const pwd   = this.user.userLoginPassword ?? '';

    if (!name || !addr || !email || !phone || !date || !role || !uname || !pwd) {
      alert('Please fill in all fields.');
      return;
    }

    if (!this.emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!this.phoneRegex.test(phone)) {
      alert('Phone number must start with 0 and be exactly 10 digits (e.g., 07XXXXXXXX).');
      return;
    }
    if (date < this.today) {
      alert('Date cannot be in the past.');
      return;
    }
    if (uname.length < 4) {
      alert('Username must be at least 4 characters.');
      return;
    }
    if (pwd.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user_account/add-user-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: name,
          userAddress: addr,
          userEmail: email,
          userPhoneNumber: phone,
          userDate: date,
          userRole: role,
          userLoginName: uname,
          userLoginPassword: pwd
        }),
      });

      if (!response.ok) throw new Error('Failed to add user');

      alert('User added successfully!');

      const ct = response.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        try { await response.json(); } catch {}
      }

      form.resetForm({
        userName: '',
        userAddress: '',
        userEmail: '',
        userPhoneNumber: '',
        userDate: '',
        userRole: '',
        userLoginName: '',
        userLoginPassword: ''
      });

      // stop here
      return;

    } catch (error) {
      console.error('Error:', error);
      alert('Error adding user');
    }
  }

  clearFields() {
    this.user.userName = '';
    this.user.userAddress = '';
    this.user.userEmail = '';
    this.user.userPhoneNumber = '';
    this.user.userDate = '';
    this.user.userRole = '';
    this.user.userLoginName = '';
    this.user.userLoginPassword = '';
  }
}
