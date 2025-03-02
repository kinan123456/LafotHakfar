import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sales-input',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './sales-input.component.html',
    styleUrls: ['./sales-input.component.css']
})
export class SalesInputComponent {
    salesForm: FormGroup = new FormGroup({
        buyerName: new FormControl('', [Validators.required]),
        breadsBought: new FormControl(1, [Validators.required, Validators.min(1)]),
        amountPaid: new FormControl(1, [Validators.required, Validators.min(1)])
    });

    constructor(private toastr: ToastrService) {}

    submitSales(): void {
        if (this.salesForm.invalid) {
            this.toastr.error('Please fill all fields correctly!', 'Validation Error');
            return;
        }
        this.toastr.success('Sales data saved successfully!', '✅ Success');
    }
}
