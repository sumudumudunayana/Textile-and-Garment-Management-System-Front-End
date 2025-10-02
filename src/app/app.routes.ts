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
];
