import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { SalesHistoryService } from '../../services/sales-history.service';
import { MatCardModule } from '@angular/material/card';

export interface SaleRecord {
    date: string;
    buyerName: string;
    breadsBought: number;
    amountPaid: number;
}

@Component({
    selector: 'app-sales-history',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ],
    templateUrl: './sales-history.component.html',
    styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {
    displayedColumns: string[] = ['date', 'buyerName', 'breadsBought', 'amountPaid', 'actions'];
    dataSource: MatTableDataSource<SaleRecord>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private salesHistoryService: SalesHistoryService) {
        this.dataSource = new MatTableDataSource<SaleRecord>([]);
    }

    ngOnInit(): void {
        this.loadSalesHistory();
    }

    loadSalesHistory(): void {
        this.dataSource.data = this.salesHistoryService.getSalesHistory();
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }

    deleteRecord(record: SaleRecord): void {
        if (confirm(`Are you sure you want to delete the sale of ${record.buyerName} on ${record.date}?`)) {
            this.salesHistoryService.deleteRecord(record);
            this.loadSalesHistory();
        }
    }

    exportToCSV() {
        const csvData = this.salesHistoryService.convertToCSV(this.dataSource.data);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sales-history.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
