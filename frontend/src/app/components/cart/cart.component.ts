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
    name: string = '';
    phone: string = '';

    constructor(private cartService: CartService, private router: Router) {}

    ngOnInit(): void {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
        });
    }

    get total() {
        return this.cartItems.reduce((acc, item) => acc + (item.bread.price * item.quantity), 0);
    }

    removeItem(breadId: string): void {
        this.cartService.removeFromCart(breadId);
    }

    increaseQuantity(breadId: string): void {
        this.cartService.addToCart({ id: breadId }, 1); // Increase quantity by 1
    }

    decreaseQuantity(breadId: string): void {
        this.cartService.removeFromCart(breadId, 1); // Decrease quantity by 1
    }

    goBackToShopping(): void {
        this.router.navigate(['/orders']);
    }

    goToCheckout(): void {
        if (this.cartItems.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }
        this.router.navigate(['/checkout']);
    }
}
