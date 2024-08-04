import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-notification',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './cart-notification.component.html',
  styleUrl: './cart-notification.component.css'
})
export class CartNotificationComponent {
  constructor(public dialogRef: MatDialogRef<CartNotificationComponent>) {}

  navigateToCart(): void {
      this.dialogRef.close('navigate');
  }

  stayOnPage(): void {
      this.dialogRef.close('stay');
  }
}
