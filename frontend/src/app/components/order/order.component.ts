import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
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
import { CartComponent } from '../cart/cart.component';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    standalone: true,
    imports: [MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, FormsModule, CommonModule, CartComponent],
    providers: [OrderService],
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    breads: Bread[] = [];
    cart: { bread: Bread, quantity: number }[] = [];
    selectedBread: { bread: Bread; quantity: number } = { bread: { id: '', name: '', image: '', price: 0 }, quantity: 0 };

    constructor(private orderService: OrderService) {}

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

    addToCart(bread: Bread): void {
        if (this.selectedBread.quantity > 0) {
            const existingItem = this.cart.find(item => item.bread.id === this.selectedBread.bread.id);

            if (existingItem) {
                // If bread is already in the cart, increase the quantity
                existingItem.quantity += this.selectedBread.quantity;
            } else {
                // Otherwise, add the new bread item to the cart
                this.cart.push({ ...this.selectedBread });
            }

            this.resetSelection();
        }
    }

    resetSelection(): void {
        this.selectedBread = { bread: { id: '', name: '', image: '', price: 0 }, quantity: 0 };
    }

    // Method to calculate total price for the selected bread and quantity
    get totalPrice(): number {
        return this.selectedBread.bread.price * this.selectedBread.quantity;
    }
}