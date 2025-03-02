import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';

@Component({
    selector: 'app-production-input',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './production-input.component.html',
    styleUrls: ['./production-input.component.css']
})
export class ProductionInputComponent extends BaseFormComponent {
    initForm(): void {
        this.form = this.fb.group({
            date: [new Date().toISOString().split('T')[0], [Validators.required]],
            flourWeightKg: [1, [Validators.required, Validators.min(1)]],
            totalBreadsMade: [1, [Validators.required, Validators.min(1)]]
        });
    }

    submitForm(): void {
        // Simulate API call
        setTimeout(() => {
            this.toastr.success('Production data saved successfully!', '✅ Success');
            this.resetForm();
        }, 1000);
    }
}