import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { SalesInputComponent } from '../sales-input/sales-input.component';
import { ExpensesInputComponent } from '../expenses-input/expenses-input.component';
import { ProductionInputComponent } from '../production-input/production-input.component';

@Component({
    selector: 'app-manager-dashboard',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, SalesInputComponent, ExpensesInputComponent, ProductionInputComponent],
    templateUrl: './manager-dashboard.component.html',
    styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
    constructor(private authService: AuthService, private router: Router) {}

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']); // Redirect to login page after logout
    }
}
