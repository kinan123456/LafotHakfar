import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { interval, take, finalize } from 'rxjs';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
    countdown: number = 5; // Configurable countdown time in seconds.

    constructor(private router: Router) {}

    ngOnInit(): void {
        // Countdown timer which updates UI every second.
        interval(1000)
            .pipe(
                take(this.countdown), // Runs for `this.countdown` seconds
                finalize(() => this.router.navigate(['/orders'])) // Redirect after countdown
            )
            .subscribe(() => this.countdown--);
    }
}
