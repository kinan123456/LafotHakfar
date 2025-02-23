import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sales-input',
    standalone: true,
    imports: [MatCardModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './sales-input.component.html',
    styleUrls: ['./sales-input.component.css']
})
export class SalesInputComponent {
    salesForm: FormGroup = new FormGroup({
        date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
        flourWeightKg: new FormControl(1, [Validators.required, Validators.min(1)]),
        totalBreadsMade: new FormControl(1, [Validators.required, Validators.min(1)]),
        buyerName: new FormControl('', [Validators.required]),
        breadsBought: new FormControl(1, [Validators.required, Validators.min(1)]),
        amountPaid: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    constructor(private toastr: ToastrService) {}

    submitSales(): void {
        if (this.salesForm.invalid) {
            this.toastr.error('Please fill all fields correctly!', 'Validation Error');
            return;
        } else {
            this.toastr.success('Sales data saved successfully!', '✅ Success')
        }
    }

    /** Block negative numbers & letters */
    preventInvalidInput(event: KeyboardEvent): void {
        const invalidKeys = ['-', 'e', 'E', '+']; // Prevents typing negative sign & exponential notation
        if (invalidKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    /** Prevent pasting negative numbers */
    preventPaste(event: ClipboardEvent): void {
        const pastedText = event.clipboardData?.getData('text') || '';
        if (pastedText.includes('-') || isNaN(Number(pastedText))) {
            event.preventDefault();
        }
    }
}
