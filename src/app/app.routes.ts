import { UserAccountAddComponent } from './pages/user-account-add/user-account-add.component';
import { Routes } from '@angular/router';
import { HeropageComponent } from './pages/heropage/heropage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ReadyMadeOrderAddComponent } from './pages/ready-made-order-add/ready-made-order-add.component';
import { ReadyMadeOrderComponent } from './pages/ready-made-order/ready-made-order.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';
import { ReadyMadeOrderManageComponent } from './pages/ready-made-order-manage/ready-made-order-manage.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { UserAccountManageComponent } from './pages/user-account-manage/user-account-manage.component';
import { UserAccountViewComponent } from './pages/user-account-view/user-account-view.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { InventoryAddComponent } from './pages/inventory-add/inventory-add.component';
import { InventoryViewComponent } from './pages/inventory-view/inventory-view.component';
import { InventoryManageComponent } from './pages/inventory-manage/inventory-manage.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerAddComponent } from './pages/customer-add/customer-add.component';
import { CustomerViewComponent } from './pages/customer-view/customer-view.component';
import { CustomerManageComponent } from './pages/customer-manage/customer-manage.component';
import { TailoringOrderComponent } from './pages/tailoring-order/tailoring-order.component';
import { TailoringOrderAddComponent } from './pages/tailoring-order-add/tailoring-order-add.component';
import { TailoringOrderViewComponent } from './pages/tailoring-order-view/tailoring-order-view.component';
import { TailoringOrderManageComponent } from './pages/tailoring-order-manage/tailoring-order-manage.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EmployeeAddComponent } from './pages/employee-add/employee-add.component';
import { EmployeeViewComponent } from './pages/employee-view/employee-view.component';
import { EmployeeManageComponent } from './pages/employee-manage/employee-manage.component';

export const routes: Routes = [
  {
    path: '',
    component: HeropageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'ready-made-order',
    component: ReadyMadeOrderComponent,
  },
  {
    path: 'ready-made-order-add',
    component: ReadyMadeOrderAddComponent,
  },
  {
    path: 'shopping-cart',
    component: ShopingCartComponent,
  },
  {
    path: 'ready-made-order-manage',
    component: ReadyMadeOrderManageComponent,
  },
  {
    path: 'user-account',
    component: UserAccountComponent,
  },
  {
    path: 'user-account-add',
    component: UserAccountAddComponent,
  },
  {
    path: 'user-account-manage',
    component: UserAccountManageComponent,
  },
  {
    path: 'user-account-view',
    component: UserAccountViewComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'inventory-add',
    component: InventoryAddComponent,
  },
  {
    path: 'inventory-view',
    component: InventoryViewComponent,
  },
  {
    path: 'inventory-manage',
    component: InventoryManageComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'customer-add',
    component: CustomerAddComponent,
  },
  {
    path: 'customer-view',
    component: CustomerViewComponent,
  },
  {
    path: 'customer-manage',
    component: CustomerManageComponent,
  },
  {
    path: 'tailoring-order',
    component: TailoringOrderComponent,
  },
  {
    path: 'tailoring-order-add',
    component: TailoringOrderAddComponent,
  },
  {
    path: 'tailoring-order-view',
    component: TailoringOrderViewComponent,
  },
  {
    path: 'tailoring-order-manage',
    component: TailoringOrderManageComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'employee-add',
    component: EmployeeAddComponent,
  },
  {
    path: 'employee-view',
    component: EmployeeViewComponent,
  },
  {
    path: 'employee-manage',
    component: EmployeeManageComponent,
  },
];
