import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardPremium {

    constructor(private router: Router) {}

    canActivate(): boolean {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                console.log(decodedToken.roles)
                if (decodedToken.roles === 'ROLE_USER_PREMIUM') {
                    return true;
                } else {
                    this.router.navigate(['/premium']);
                    return false;
                }
            } catch (error) {
                this.router.navigate(['/premium']);
                return false;
            }
        } else {
            this.router.navigate(['/premium']);
            return false;
        }
    }
}
