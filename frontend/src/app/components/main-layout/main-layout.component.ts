import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule, MatNavList],
    templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
    constructor(public authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}
