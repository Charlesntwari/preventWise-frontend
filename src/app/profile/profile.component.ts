import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  predictionHistory: any[] = [];
  loading = true;
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getPredictionHistory().subscribe({
      next: (history) => {
        this.predictionHistory = history;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch prediction history:', err);
        this.error = 'Could not load prediction history.';
        this.loading = false;
      },
    });
  }
}
