import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardPremiumForPremium {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const roles = decodedToken.roles;
        console.log(roles)
        if (roles.includes('ROLE_USER_STANDARD') && roles.includes('ROLE_USER_PREMIUM')) {
          return true;
        } else if (roles == 'ROLE_USER_STANDARD') {
          this.router.navigate(['/premium']);
          return false;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      } catch (error) {
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
