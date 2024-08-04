import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [MatDividerModule, MatCardModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
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

    checkout(): void {
        if (!this.name || !this.phone) {
            alert('Please fill out all fields.');
            return;
        }

        const message = `Order received for ${this.name}. Total: ${this.total}. Thank you!`;
        this.cartService.sendSms(this.phone, message);
        this.cartService.clearCart();

        alert('Your order has been placed and a confirmation SMS will be sent to you.');
        this.goBackToShopping();
    }
}
