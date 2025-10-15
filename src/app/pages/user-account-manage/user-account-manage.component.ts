import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account-manage',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './user-account-manage.component.html',
  styleUrl: './user-account-manage.component.css'
})
export class UserAccountManageComponent {
  id: any;
    public userInfo: any = {};
    public updatedUserInfo: any = {};
  
    ngOnInit(): void {}
  
    async getUserInfo() {
      if (!this.id) {
        alert("Please enter a valid user ID.");
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/user_account/search-by-id/${this.id}`);
        if (!response.ok) {
          throw new Error("user not found or an error occurred.");
        }
        this.userInfo = await response.json();
        this.updatedUserInfo = { ...this.userInfo }; 
        console.log(this.userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Error finding user info. Please check the ID and try again.");
      }
    }
  
    async updateUser() {
      try {
        let response = await fetch('http://localhost:8080/user_account/update-user-account', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.updatedUserInfo)
        });
  
        if (!response.ok) {
          throw new Error("Error updating user.");
        }
  
        alert("user updated successfully!");
        this.getUserInfo(); 
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Error updating user. Please try again.");
      }
    }
  
    async deleteUser() {
      if (!confirm("Are you sure you want to delete this user?")) {
        return;
      }
  
      try {
        let response = await fetch(`http://localhost:8080/user_account/delete-by-id/${this.id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error("Error deleting user.");
        }
  
        alert("user deleted successfully!");
        this.userInfo = {}; 
        this.id = null; 
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again.");
      }
    }
}
