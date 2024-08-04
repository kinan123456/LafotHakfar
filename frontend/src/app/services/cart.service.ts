import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bread } from '../models/bread';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: { bread: Bread; quantity: number }[] = [];
    private cartItemsSubject = new BehaviorSubject<{ bread: Bread; quantity: number }[]>(this.cartItems);

    // Observable to expose cart items to components
    cartItems$ = this.cartItemsSubject.asObservable();

    addToCart(bread: Bread, quantity: number): void {
        const existingItem = this.cartItems.find(item => item.bread.id === bread.id);

        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity if item exists
        } else {
            this.cartItems.push({ bread, quantity }); // Add new item to cart
        }
        this.cartItemsSubject.next(this.cartItems); // Update subscribers
    }

    removeFromCart(breadId: string): void {
        this.cartItems = this.cartItems.filter(item => item.bread.id !== breadId);
        this.cartItemsSubject.next(this.cartItems); // Update subscribers
    }

    getCartItems(): { bread: Bread; quantity: number }[] {
        return this.cartItems;
    }
}
