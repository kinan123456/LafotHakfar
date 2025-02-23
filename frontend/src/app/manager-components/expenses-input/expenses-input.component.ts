import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-expenses-input',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './expenses-input.component.html',
    styleUrls: ['./expenses-input.component.css']
})
export class ExpensesInputComponent {
    expensesForm: FormGroup = new FormGroup({
        date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
        flourCost: new FormControl(1, [Validators.required, Validators.min(1)]),
        gasCost: new FormControl(1, [Validators.required, Validators.min(1)]),
        accountantCost: new FormControl(1, [Validators.required, Validators.min(1)]),
        nationalInsurance: new FormControl(1, [Validators.required, Validators.min(1)]),
        oilCost: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    constructor(private toastr: ToastrService) {}

    submitExpenses(): void {
        if (this.expensesForm.invalid) {
            this.toastr.error('Please fill all fields correctly!', 'Validation Error');
            return;
        }

        this.toastr.success('Expenses saved successfully!', '✅ Success');
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
