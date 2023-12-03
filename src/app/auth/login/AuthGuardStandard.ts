import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardStandard {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        if (decodedToken.roles === 'ROLE_USER_STANDARD') {
          return true;
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
