import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Bread } from '../models/bread';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = this.loadCart();
    private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
    readonly cartItems$ = this.cartItemsSubject.asObservable();

    constructor() {}

    private loadCart(): CartItem[] {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    addToCart(bread: Bread, quantity: number): void {
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

    sendSms(phone: string, message: string): void { }
}
