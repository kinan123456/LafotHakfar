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
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

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
    selectedBreads: { [breadId: string]: number } = {}; // Track selected bread quantities

    constructor(
        private orderService: OrderService,
        private cartService: CartService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loadBreads();
        this.loadSelectedBreads();
    }

    private loadBreads(): void {
        this.orderService.getBreads().subscribe(breads => {
            this.breads = breads;
        });
    }

    private loadSelectedBreads(): void {
        const storedSelection = localStorage.getItem('selectedBreads');
        if (storedSelection) {
            this.selectedBreads = JSON.parse(storedSelection);
        }
    }

    private saveSelectedBreads(): void {
        localStorage.setItem('selectedBreads', JSON.stringify(this.selectedBreads));
    }

    increaseQuantity(bread: Bread): void {
        if (!this.selectedBreads[bread.id]) {
            this.selectedBreads[bread.id] = 1;
        } else {
            this.selectedBreads[bread.id]++;
        }
        this.saveSelectedBreads();
    }

    decreaseQuantity(bread: Bread): void {
        if (this.selectedBreads[bread.id] && this.selectedBreads[bread.id] > 0) {
            this.selectedBreads[bread.id]--;
            if (this.selectedBreads[bread.id] === 0) {
                delete this.selectedBreads[bread.id];
            }
            this.saveSelectedBreads();
        }
    }

    addToCart(bread: Bread): void {
        const quantity = this.selectedBreads[bread.id] || 0;
        if (quantity > 0) {
            this.cartService.addToCart(bread, quantity);
            this.toastr.success(`${quantity} x ${bread.name} added to cart!`);
            delete this.selectedBreads[bread.id];
            this.saveSelectedBreads();
        } else {
            this.toastr.warning('Please select a quantity before adding.');
        }
    }

    getTotalPrice(bread: Bread): number {
        return (this.selectedBreads[bread.id] || 0) * bread.price;
    }
}
