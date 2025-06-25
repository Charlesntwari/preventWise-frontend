import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ToastrModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'preventWise-frontend';
  onDiabet(): void {
    window.location.href = '/predict/diabetes';
  }

  get isAdmin(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user && user.is_admin === 1;
    } catch {
      return false;
    }
  }
}
