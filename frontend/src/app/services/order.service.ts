import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bread } from '../models/bread';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    getBreads(): Observable<Bread[]> {
        const breads: Bread[] = [
            {
                id: '1',
                name: 'White Bread',
                image: '',
                price: 5.00
            },
            {
                id: '2',
                name: 'Whole Wheat Bread',
                image: '',
                price: 6.00
            },
            {
                id: '3',
                name: 'Sourdough Bread',
                image: '',
                price: 7.50
            },
            {
                id: '4',
                name: 'Multigrain Bread',
                image: '',
                price: 6.75
            },
            {
                id: '5',
                name: 'Rye Bread',
                image: '',
                price: 6.50
            },
            {
                id: '6',
                name: 'Ciabatta Bread',
                image: '',
                price: 8.00
            }
        ];

        return of(breads);
    }
}
