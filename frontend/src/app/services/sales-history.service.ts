import { Injectable } from '@angular/core';
import { SaleRecord } from '../manager-components/sales-history/sales-history.component';

@Injectable({
    providedIn: 'root'
})
export class SalesHistoryService {
    private salesHistory: SaleRecord[] = [
        { date: '2025-02-25', buyerName: 'John Doe', breadsBought: 10, amountPaid: 50 },
        { date: '2025-02-26', buyerName: 'Jane Smith', breadsBought: 5, amountPaid: 25 }
    ];

    getSalesHistory(): SaleRecord[] {
        return this.salesHistory;
    }

    addSaleRecord(record: SaleRecord): void {
        this.salesHistory.push(record);
    }

    deleteRecord(record: SaleRecord): void {
        this.salesHistory = this.salesHistory.filter(sale => sale !== record);
    }

    convertToCSV(data: SaleRecord[]): string {
        const header = 'Date,Buyer Name,Breads Bought,Amount Paid\n';
        const csvRows = data.map(row =>
            `${row.date},${row.buyerName},${row.breadsBought},${row.amountPaid}`
        );
        return header + csvRows.join('\n');
    }
}
