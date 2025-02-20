import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartItem } from '../../models/cart-item';

@Component({
    selector: 'app-order-summary',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatDividerModule],
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
    @Input() cartItems: CartItem[] = [];
    @Input() total: number = 0;
}
