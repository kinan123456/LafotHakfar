import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: { bread: any; quantity: number }[] = [];
    private cartItemsSubject = new BehaviorSubject<{ bread: any; quantity: number }[]>(this.cartItems);
    cartItems$ = this.cartItemsSubject.asObservable();

    addToCart(bread: any, quantity: number): void {
        const existingItem = this.cartItems.find(item => item.bread.id === bread.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if it exists
        } else {
            this.cartItems.push({ bread, quantity }); // Add new item
        }
        this.cartItemsSubject.next(this.cartItems); // Notify subscribers
    }

    removeFromCart(breadId: string, quantity: number = 0): void {
        const existingItem = this.cartItems.find(item => item.bread.id === breadId);
        if (existingItem) {
            if (quantity > 0) {
                existingItem.quantity -= quantity; // Decrease quantity
                if (existingItem.quantity <= 0) {
                    this.cartItems = this.cartItems.filter(item => item.bread.id !== breadId); // Remove item if quantity is 0
                }
            } else {
                this.cartItems = this.cartItems.filter(item => item.bread.id !== breadId); // Remove item completely
            }
        }
        this.cartItemsSubject.next(this.cartItems); // Notify subscribers
    }

    clearCart(): void {
        this.cartItems = [];
        this.cartItemsSubject.next(this.cartItems);
    }

    sendSms(phone: string, message: string): void {
        console.log(`Sending SMS to ${phone}: ${message}`);
    }
}
