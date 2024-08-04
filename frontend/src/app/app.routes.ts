import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    { path: 'orders', component: OrderComponent },
    { path: 'cart', component: CartComponent },
    { path: '', redirectTo: '/orders', pathMatch: 'full' },
 ];
