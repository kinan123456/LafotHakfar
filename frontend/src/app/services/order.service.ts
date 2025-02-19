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
                price: 7.50
            },
            {
                id: '4',
                name: 'Multigrain Bread',
                image: 'assets/images/multigrain-bread.jpg',
                price: 6.75
            },
            {
                id: '5',
                name: 'Rye Bread',
                image: 'assets/images/rye-bread.jpg',
                price: 6.50
            },
            {
                id: '6',
                name: 'Ciabatta Bread',
                image: 'assets/images/ciabatta-bread.jpg',
                price: 8.00
            },
            {
                id: '7',
                name: 'Focaccia Bread',
                image: 'assets/images/focaccia-bread.jpg',
                price: 9.00
            },
            {
                id: '8',
                name: 'Baguette',
                image: 'assets/images/baguette.jpg',
                price: 4.50
            },
            {
                id: '9',
                name: 'Brioche',
                image: 'assets/images/brioche.jpg',
                price: 7.00
            },
            {
                id: '10',
                name: 'Gluten-Free Bread',
                image: 'assets/images/gluten-free-bread.jpg',
                price: 8.50
            }
        ];

        return of(breads);
    }
}
