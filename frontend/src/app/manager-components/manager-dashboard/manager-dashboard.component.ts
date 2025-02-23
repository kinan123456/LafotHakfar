import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesInputComponent } from '../sales-input/sales-input.component';

@Component({
    selector: 'app-manager-dashboard',
    standalone: true,
    imports: [CommonModule, SalesInputComponent],
    templateUrl: './manager-dashboard.component.html',
    styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
    currentSection: 'sales' = 'sales';

    showSection(section: 'sales'): void {
        this.currentSection = section;
    }
}
