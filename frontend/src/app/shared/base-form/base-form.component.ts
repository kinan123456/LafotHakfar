// base-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    template: '' // Abstract component, no template
})
export abstract class BaseFormComponent implements OnInit {
    form!: FormGroup;
    isLoading = false;

    constructor(protected fb: FormBuilder, protected toastr: ToastrService) {}

    ngOnInit(): void {
        this.initForm();
    }

    abstract initForm(): void;

    onSubmit(): void {
        if (this.form.invalid) {
            this.toastr.error('Please fill all fields correctly!', 'Validation Error');
            return;
        }
        this.isLoading = true;
        this.submitForm();
    }

    abstract submitForm(): void;

    resetForm(): void {
        this.form.reset();
        this.isLoading = false;
    }
}