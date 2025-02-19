import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../models/cart-item';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [MatDividerModule, MatCardModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    cartItems: CartItem[] = [];
    checkoutForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(15)
        ])
    });

    constructor(
        private cartService: CartService,
        private router: Router,
        private snackBar: MatSnackBar,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
            this.redirectIfCartEmpty();
        });
    }

    /** Redirects user if cart is empty */
    private redirectIfCartEmpty(): void {
        if (this.cartItems.length === 0) {
            this.toastr.warning('Your cart is empty. Redirecting to orders page...', 'Warning');
            of(null).pipe(delay(3000)).subscribe(() => {
                this.router.navigate(['/orders']);
            });
        }
    }

    /** Calculates total order amount */
    get total(): number {
        return this.cartItems.reduce((acc, item) => acc + (item.bread.price * item.quantity), 0);
    }

    /** Handles order submission */
    checkout(): void {
        if (this.checkoutForm.invalid) {
            this.toastr.error('Please fill out all required fields correctly before proceeding.', 'Validation Error');
            return;
        }

        const { name, phone } = this.checkoutForm.value;
        this.toastr.success(`Order received for ${name}. Total: ${this.total}.`, 'Order Placed');
        this.cartService.clearCart();

        of(null).pipe(delay(2000)).subscribe(() => {
            this.router.navigate(['/orders']);
        });
    }

    goBackToShopping(): void {
        this.router.navigate(['/orders']);
    }
}
