import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'orders', loadComponent: () => import('./components/order/order.component').then(m => m.OrderComponent) },
    { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
    { path: 'checkout', loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent) },
    { path: '', redirectTo: '/orders', pathMatch: 'full' },
];
