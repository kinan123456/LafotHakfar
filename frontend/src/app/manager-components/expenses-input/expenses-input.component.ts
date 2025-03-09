// expenses-input.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
        this.form = this.fb.group(
            {
                date: [new Date().toISOString().split('T')[0], [Validators.required]],
                flourCost: [null], // Initially empty (allow optional)
                gasCost: [null],
                accountantCost: [null],
                nationalInsurance: [null],
                oilCost: [null]
            },
            { validators: this.atLeastOneCostRequired() }
        );
    }
    
    /** Custom Validator: At least one cost field must be filled */
    private atLeastOneCostRequired(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const { flourCost, gasCost, accountantCost, nationalInsurance, oilCost } = control.value;
    
            // Check if at least one field has a positive number
            if (
                [flourCost, gasCost, accountantCost, nationalInsurance, oilCost].some(
                    (value) => value !== null && value !== undefined && value > 0
                )
            ) {
                return null; // Form is valid
            }
    
            return { atLeastOneRequired: true }; // Return error if all are empty or zero
        };
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