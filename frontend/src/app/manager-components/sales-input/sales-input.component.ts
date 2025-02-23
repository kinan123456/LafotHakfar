import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sales-input',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './sales-input.component.html'
})
export class SalesInputComponent {
    salesForm: FormGroup = new FormGroup({
        date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
        flourWeightKg: new FormControl(0, [Validators.required, Validators.min(1)]),
        totalBreadsMade: new FormControl(0, [Validators.required, Validators.min(1)]),
        buyerName: new FormControl('', [Validators.required]),
        breadsBought: new FormControl(0, [Validators.required, Validators.min(1)]),
        amountPaid: new FormControl(0, [Validators.required, Validators.min(0)])
    });

    constructor(private readonly toastr: ToastrService) {}

    submitSales(): void {
        this.toastr.success('Sales data saved successfully!', 'Success');
        // this.http.post('https://localhost:5001/api/sales/save', this.salesForm.value).subscribe(
        //     () => this.toastr.success('Sales data saved successfully!', 'Success'),
        //     () => this.toastr.error('Failed to save sales data.', 'Error')
        // );
    }
}
