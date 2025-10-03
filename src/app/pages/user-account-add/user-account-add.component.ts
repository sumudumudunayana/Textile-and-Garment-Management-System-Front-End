import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account-add',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './user-account-add.component.html',
  styleUrl: './user-account-add.component.css'
})
export class UserAccountAddComponent {
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

  async addUser() {
    try {
      let response = await fetch('http://localhost:8080/user_account/add-user-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: this.user.userName,
          userAddress: this.user.userAddress,
          userEmail: this.user.userEmail,
          userPhoneNumber: this.user.userPhoneNumber,
          userDate: this.user.userDate,
          userRole: this.user.userRole,
          userLoginName: this.user.userLoginName,
          userLoginPassword: this.user.userLoginPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      alert('user added successfully');
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearFields() {
    this.user = {
      userName: '',
      userAddress: '',
      userEmail: '',
      userPhoneNumber: '',
      userDate: '',
      userRole: '',
      userLoginName: '',
    userLoginPassword: ''
    };
  }
}
