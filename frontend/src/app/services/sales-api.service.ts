import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { SaleRecord } from "../models/sale-record";

@Injectable({
    providedIn: 'root',
})
export class SalesApiService {
    private apiUrl = `${environment.apiUrl}/sales`;

    private readonly salesHistorySubject$ = new BehaviorSubject<SaleRecord[]>([]);
    readonly salesHistory$: Observable<SaleRecord[]>;

    constructor(private http: HttpClient) { 
        this.salesHistory$ = this.salesHistorySubject$.asObservable();
    }

    refetchSalesRecordsHistory(): Observable<SaleRecord[]> {
        return this.http.get<SaleRecord[]>(this.apiUrl + "/GetSaleRecordsHistory").pipe(
            tap((sales) => this.salesHistorySubject$.next(sales))
        );
    }

    // Add a new sale record
    addSaleInput(sale: SaleRecord): Observable<SaleRecord> {
        return this.http.post<SaleRecord>(this.apiUrl + "/SaveNewSaleRecord", sale);
    }

    deleteRecord(record: SaleRecord): void { }

    convertToCSV(data: SaleRecord[]): string { return '' }
}