import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-tailoring-order',
  standalone: true,
  imports: [NavbarComponent,FormsModule, CommonModule, RouterLink],
  templateUrl: './tailoring-order.component.html',
  styleUrl: './tailoring-order.component.css'
})
export class TailoringOrderComponent {

}
