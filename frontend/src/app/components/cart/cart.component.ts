import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [MatDividerModule, MatCardModule, CommonModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: { bread: any; quantity: number }[] = [];

    constructor(private cartService: CartService, private router: Router) {}

    ngOnInit(): void {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items; // Subscribe to cart items
        });
    }

    get total() {
        return this.cartItems.reduce((acc, item) => acc + (item.bread.price * item.quantity), 0);
    }

    removeItem(breadId: string): void {
        this.cartService.removeFromCart(breadId); // Use the service to remove items
    }

    goBackToShopping(): void {
        this.router.navigate(['/orders']); // Navigate to the orders/homepage
    }
}