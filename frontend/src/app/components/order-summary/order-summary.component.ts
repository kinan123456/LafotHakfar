import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() readOnly: boolean = false; // Controls whether buttons are displayed

    // Emit events for quantity changes & removal (used in cart, but NOT in checkout)
    @Output() increaseQuantity = new EventEmitter<string>();
    @Output() decreaseQuantity = new EventEmitter<string>();
    @Output() removeItem = new EventEmitter<string>();

    // Trigger increase quantity
    onIncrease(breadId: string): void {
        this.increaseQuantity.emit(breadId);
    }

    // Trigger decrease quantity
    onDecrease(breadId: string): void {
        this.decreaseQuantity.emit(breadId);
    }

    // Trigger remove item
    onRemove(breadId: string): void {
        this.removeItem.emit(breadId);
    }
}
