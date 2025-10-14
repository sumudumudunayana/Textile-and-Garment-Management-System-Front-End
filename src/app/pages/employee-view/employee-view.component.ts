import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [NavbarComponent, NgFor, FormsModule, CommonModule],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent {
ngOnInit(): void {
    this.getEmployeeInfo();
  }

  public employeeInfo:any = []

  async getEmployeeInfo() {
    let response = await fetch("http://localhost:8080/employee/get-all");
    let body = await response.json();
    this.employeeInfo = body;
    console.log(this.employeeInfo);
    
  }
}
