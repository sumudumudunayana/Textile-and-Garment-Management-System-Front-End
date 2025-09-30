import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


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

  login() {
    if (this.username === 'Admin' && this.password === 'admin123') {
      alert('Login successful');
      window.location.href = '/dashboard';
    } else {
      alert('Invalid email or password');
    }
  }

}
