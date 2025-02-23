import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ManagerGuard } from './guards/manager.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'orders', loadComponent: () => import('./components/order/order.component').then(m => m.OrderComponent) },
            { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
            { path: 'checkout', loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent) },
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) }
        ]
    },
    {
        path: 'manager',
        loadComponent: () => import('./manager-components/manager-dashboard/manager-dashboard.component').then(m => m.ManagerDashboardComponent),
        canActivate: [ManagerGuard] // Only accessible for managers
    },
    { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
