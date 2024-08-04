import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bread } from '../models/bread';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    getBreads(): Observable<Bread[]> {
        // Fake data for testing
        const breads: Bread[] = [
            {
                id: '1',
                name: 'White Bread',
                image: 'assets/images/white-bread.jpg',
                price: 5.00
            },
            {
                id: '2',
                name: 'Whole Wheat Bread',
                image: 'assets/images/whole-wheat-bread.jpg',
                price: 6.00
            },
            {
                id: '3',
                name: 'Sourdough Bread',
                image: 'assets/images/sourdough-bread.jpg',
                price: 7.00
            },
            {
                id: '4',
                name: 'Rye Bread',
                image: 'assets/images/rye-bread.jpg',
                price: 6.50
            },
            {
                id: '5',
                name: 'Focaccia Bread',
                image: 'assets/images/focaccia-bread.jpg',
                price: 8.00
            }
        ];

        return of(breads); // Return the fake data as an observable
    }
}
