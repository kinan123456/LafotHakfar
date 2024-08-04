// src/app/components/cart/cart.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [MatDividerModule, MatCardModule, CommonModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    @Input() cartItems: { bread: any, quantity: number }[] = [];

    get total() {
        return this.cartItems.reduce((acc, item) => acc + (item.bread.price * item.quantity), 0);
    }
}
