import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { of } from 'rxjs';
import { delay } from 'rxjs/operators'; // Import delay operator

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [MatDividerModule, MatCardModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    cartItems: { bread: any; quantity: number }[] = [];
    name: string = '';
    phone: string = '';

    constructor(private cartService: CartService, private router: Router, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
            this.checkCartItems(); // Check cart items on initialization
        });
    }

    checkCartItems(): void {
        if (this.cartItems.length === 0) {
            this.snackBar.open('Your cart is empty. Redirecting to orders page...', 'Close', {
                duration: 3000,
            });

            // Use RxJS to delay the navigation
            of(null).pipe(
                delay(3000) // Delay for 3 seconds
            ).subscribe(() => {
                this.router.navigate(['/orders']); // Navigate back to the orders page
            });
        }
    }

    get total() {
        return this.cartItems.reduce((acc, item) => acc + (item.bread.price * item.quantity), 0);
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
        this.router.navigate(['/orders']);
    }

    goBackToShopping(): void {
      this.router.navigate(['/orders']);
  }
}
