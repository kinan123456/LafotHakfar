import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-production-input',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './production-input.component.html',
    styleUrls: ['./production-input.component.css']
})
export class ProductionInputComponent {
    productionForm: FormGroup = new FormGroup({
        date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
        flourWeightKg: new FormControl(1, [Validators.required, Validators.min(1)]),
        totalBreadsMade: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    constructor(private toastr: ToastrService) {}

    submitProduction(): void {
        if (this.productionForm.invalid) {
            this.toastr.error('Please fill all fields correctly!', 'Validation Error');
            return;
        }
        this.toastr.success('Production data saved successfully!', '✅ Success');
    }
}
