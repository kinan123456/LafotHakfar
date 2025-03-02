import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';

@Component({
    selector: 'app-sales-input',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './sales-input.component.html',
    styleUrls: ['./sales-input.component.css']
})
export class SalesInputComponent extends BaseFormComponent {
    initForm(): void {
        this.form = this.fb.group({
            buyerName: ['', [Validators.required]],
            breadsBought: [1, [Validators.required, Validators.min(1)]],
            amountPaid: [1, [Validators.required, Validators.min(1)]]
        });
    }

    submitForm(): void {
        // Simulate API call
        setTimeout(() => {
            this.toastr.success('Sales data saved successfully!', '✅ Success');
            this.resetForm();
        }, 1000);
    }
}