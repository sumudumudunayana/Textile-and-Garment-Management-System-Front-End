import { Routes } from '@angular/router';
import { HeropageComponent } from './pages/heropage/heropage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { AdminManageComponent } from './pages/admin-manage/admin-manage.component';
import { ReadyMadeOrderAddComponent } from './pages/ready-made-order-add/ready-made-order-add.component';
import { ReadyMadeOrderComponent } from './pages/ready-made-order/ready-made-order.component';
import { ShopingCartComponent } from './pages/shoping-cart/shoping-cart.component';

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
    path: 'manage-admin',
    component: AdminManageComponent,
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


];
