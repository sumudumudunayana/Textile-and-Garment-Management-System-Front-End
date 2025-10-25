import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[] | undefined;
    const role = this.auth.role;
    if (!role) {
      this.router.navigateByUrl('/');
      return false;
    }
    if (expectedRoles && !expectedRoles.includes(role)) {
      if (role === 'Sales Rep') this.router.navigateByUrl('/sales');
        else if (role === 'HR Officer') this.router.navigateByUrl('/HR-dashboard');
      else this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
