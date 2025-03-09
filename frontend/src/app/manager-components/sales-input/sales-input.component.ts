import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { SaleRecord } from '../../models/sale-record';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SalesApiService } from '../../services/sales-api.service';

@UntilDestroy()
@Component({
    selector: 'app-sales-input',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './sales-input.component.html',
    styleUrls: ['./sales-input.component.css']
})
export class SalesInputComponent extends BaseFormComponent {
    constructor(private readonly salesApiService: SalesApiService, fb: FormBuilder, toastr: ToastrService) {
        super(fb, toastr);
    }

    initForm(): void {
        this.form = this.fb.group({
            buyerName: ['', [Validators.required]],
            breadsBought: [1, [Validators.required, Validators.min(1)]],
            amountPaid: [1, [Validators.required, Validators.min(1)]]
        });
    }

    submitForm(): void {
        const saleRecord: SaleRecord = this.form.value;

        this.salesApiService.saveNewSaleRecord(saleRecord).pipe(untilDestroyed(this)).subscribe({
            next: () => {
              this.toastr.success('Sales record added successfully!', '✅ Success');
              this.resetAll();
            },
            error: () => {
              this.toastr.error('Failed to add sales record.', '❌ Error');
              this.resetAll();
            }
        });
    }

    private resetAll(): void {
        this.resetForm();
        this.form.reset({ date: new Date().toISOString().split('T')[0], buyerName: '', breadsBought: 1, amountPaid: 1 });
    }
}