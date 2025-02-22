import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userRole: 'customer' | 'manager' | null = null;

    constructor(private router: Router) {}

    /** Logs the user in and stores the role */
    login(username: string, password: string): boolean {
        if (username === 'manager' && password === 'admin123') {
            this.userRole = 'manager';
            localStorage.setItem('userRole', 'manager');
            this.router.navigate(['/manager']);
            return true;
        } else if (username === 'customer' && password === '123456') {
            this.userRole = 'customer';
            localStorage.setItem('userRole', 'customer');
            this.router.navigate(['/orders']);
            return true;
        } else {
            return false;
        }
    }

    /** Checks if a user is logged in */
    isLoggedIn(): boolean {
        return this.userRole !== null || localStorage.getItem('userRole') !== null;
    }

    /** Returns the current user's role */
    getRole(): 'customer' | 'manager' | null {
        return this.userRole || (localStorage.getItem('userRole') as 'customer' | 'manager' | null);
    }

    /** Checks if the user is a manager */
    isManager(): boolean {
        return this.getRole() === 'manager';
    }

    /** Logs the user out and redirects to login */
    logout(): void {
        this.userRole = null;
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
    }
}
