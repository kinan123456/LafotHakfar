import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Bread } from '../../models/bread';
import { MatDialog } from '@angular/material/dialog';
import { CartNotificationComponent } from '../cart-notification/cart-notification.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    standalone: true,
    imports: [MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, FormsModule, CommonModule],
    providers: [OrderService],
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    breads: Bread[] = [];
    selectedBread: { bread: Bread; quantity: number } = { bread: { id: '', name: '', image: '', price: 0 }, quantity: 0 };

    constructor(
        private orderService: OrderService,
        private dialog: MatDialog,
        private router: Router,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.loadBreads();
    }

    loadBreads(): void {
        this.orderService.getBreads().subscribe(breads => {
            this.breads = breads;
        });
    }

    increaseQuantity(bread: Bread): void {
        if (this.selectedBread.bread.id === bread.id) {
            this.selectedBread.quantity++;
        } else {
            this.selectedBread = { bread, quantity: 1 }; // Reset quantity for a new bread selection
        }
    }

    decreaseQuantity(bread: Bread): void {
        if (this.selectedBread.bread.id === bread.id && this.selectedBread.quantity > 0) {
            this.selectedBread.quantity--;
        }
    }

    addToCart(): void {
        if (this.selectedBread.quantity > 0) {
            this.cartService.addToCart(this.selectedBread.bread, this.selectedBread.quantity); // Use the service to add items
            this.openCartNotification();
            this.resetSelection();
        }
    }

    openCartNotification(): void {
        const dialogRef = this.dialog.open(CartNotificationComponent, {
            width: '400px', // Set the width of the dialog
            panelClass: 'custom-dialog-container', // Apply custom styles
            disableClose: true // Prevent closing the dialog by clicking outside
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'navigate') {
                this.router.navigate(['/cart']); // Navigate to cart page
            }
        });
    }

    resetSelection(): void {
        this.selectedBread = { bread: { id: '', name: '', image: '', price: 0 }, quantity: 0 };
    }

    // Method to calculate total price for the selected bread and quantity
    get totalPrice(): number {
        return this.selectedBread.bread.price * this.selectedBread.quantity;
    }
}
