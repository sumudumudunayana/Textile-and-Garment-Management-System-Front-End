import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [NavbarComponent,FormsModule, CommonModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

}
