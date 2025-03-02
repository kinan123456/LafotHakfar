// expenses-input.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';

@Component({
    selector: 'app-expenses-input',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
    templateUrl: './expenses-input.component.html',
    styleUrls: ['./expenses-input.component.css']
})
export class ExpensesInputComponent extends BaseFormComponent {
    initForm(): void {
        this.form = this.fb.group({
            date: [new Date().toISOString().split('T')[0], [Validators.required]],
            flourCost: [1, [Validators.required, Validators.min(1)]],
            gasCost: [1, [Validators.required, Validators.min(1)]],
            accountantCost: [1, [Validators.required, Validators.min(1)]],
            nationalInsurance: [1, [Validators.required, Validators.min(1)]],
            oilCost: [1, [Validators.required, Validators.min(1)]]
        });
    }

    submitForm(): void {
        // Simulate API call
        setTimeout(() => {
            this.toastr.success('Expenses saved successfully!', '✅ Success');
            this.resetForm();
        }, 1000);
    }

    preventInvalidInput(event: KeyboardEvent): void {
        const invalidKeys = ['-', 'e', 'E', '+'];
        if (invalidKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    preventPaste(event: ClipboardEvent): void {
        const pastedText = event.clipboardData?.getData('text') || '';
        if (pastedText.includes('-') || isNaN(Number(pastedText))) {
            event.preventDefault();
        }
    }
}