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

    @Output() increaseQuantity = new EventEmitter<string>();
    @Output() decreaseQuantity = new EventEmitter<string>();
    @Output() removeItem = new EventEmitter<string>();

    onIncrease(breadId: string): void {
        this.increaseQuantity.emit(breadId);
    }

    onDecrease(breadId: string): void {
        this.decreaseQuantity.emit(breadId);
    }

    onRemove(breadId: string): void {
        this.removeItem.emit(breadId);
    }
}
