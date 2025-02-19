import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: { bread: any; quantity: number }[] = this.loadCart();
    private readonly cartItemsSubject = new BehaviorSubject<{ bread: any; quantity: number }[]>(this.cartItems);
    readonly cartItems$ = this.cartItemsSubject.asObservable();

    constructor() {}

    private loadCart(): { bread: any; quantity: number }[] {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    addToCart(bread: any, quantity: number): void {
        const existingItem = this.cartItems.find(item => item.bread.id === bread.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cartItems.push({ bread, quantity });
        }
        this.cartItemsSubject.next(this.cartItems);
        this.saveCart();
    }

    removeFromCart(breadId: string, quantity: number = 0): void {
        const existingItem = this.cartItems.find(item => item.bread.id === breadId);
        if (existingItem) {
            if (quantity > 0) {
                existingItem.quantity -= quantity;
                if (existingItem.quantity <= 0) {
                    this.cartItems = this.cartItems.filter(item => item.bread.id !== breadId);
                }
            } else {
                this.cartItems = this.cartItems.filter(item => item.bread.id !== breadId);
            }
        }
        this.cartItemsSubject.next(this.cartItems);
        this.saveCart();
    }

    clearCart(): void {
        this.cartItems = [];
        this.cartItemsSubject.next(this.cartItems);
        localStorage.removeItem('cart');
    }

    sendSms(phone: string, message: string): void {
        // this.http.post('https://your-backend-api.com/send-sms', { phone, message })
        //     .subscribe(response => console.log('SMS sent successfully:', response),
        //                error => console.error('SMS sending failed:', error));
    }
}
