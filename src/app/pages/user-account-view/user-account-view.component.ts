import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-account-view',
  standalone: true,
  imports: [NavbarComponent, NgFor, FormsModule, CommonModule],
  templateUrl: './user-account-view.component.html',
  styleUrl: './user-account-view.component.css'
})
export class UserAccountViewComponent {
   ngOnInit(): void {
    this.getUserInfo();
  }

  public userInfo:any = []

  async getUserInfo() {
    let response = await fetch("http://localhost:8080/user_account/get-all");
    let body = await response.json();
    this.userInfo = body;
    console.log(this.userInfo);
    
  }
}
