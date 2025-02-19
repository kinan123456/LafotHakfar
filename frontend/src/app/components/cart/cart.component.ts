import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [MatDividerModule, MatCardModule, CommonModule, FormsModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    discountCode: string = '';
    discountApplied: boolean = false;

    constructor(private cartService: CartService, readonly router: Router, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
        });
    }

    get total(): number {
        let total = this.cartItems.reduce((acc, item) => acc + (item.bread.price * item.quantity), 0);
        return this.discountApplied ? total * 0.9 : total;
    }

    getTotalPrice(item: CartItem): number {
        return item.bread.price * item.quantity;
    }

    increaseQuantity(breadId: string): void {
        const item = this.cartItems.find(item => item.bread.id === breadId);
        if (item) {
            this.cartService.addToCart(item.bread, 1);
            this.toastr.success('Item quantity increased!', 'Success');
        }
    }

    decreaseQuantity(breadId: string): void {
        const item = this.cartItems.find(item => item.bread.id === breadId);
        if (item && item.quantity > 1) {
            this.cartService.removeFromCart(breadId, 1);
            this.toastr.info('Item quantity decreased', 'Updated');
        } else {
            this.removeItem(breadId);
        }
    }

    removeItem(breadId: string): void {
        if (confirm('Are you sure you want to remove this item?')) {
            this.cartService.removeFromCart(breadId);
            this.toastr.success('Item removed from cart!', 'Success');
        }
    }

    applyDiscount(): void {
        if (this.discountCode === 'DISCOUNT10') {
            this.discountApplied = true;
            this.toastr.success('Discount applied!', 'Success');
        } else {
            this.toastr.error('Invalid discount code!', 'Error');
        }
    }

    goToCheckout(): void {
        if (this.cartItems.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }
        this.router.navigate(['/checkout']);
    }
}
