import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  showConfirmModal = false;
  deleting = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
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

  openConfirmModal() {
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  confirmDeleteHistory() {
    this.deleting = true;
    this.authService.deletePredictionHistory().subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'History deleted!');
        this.deleting = false;
        this.showConfirmModal = false;
        this.loadHistory();
      },
      error: (err) => {
        this.toastr.error(err.message || 'Failed to delete history');
        this.deleting = false;
        this.showConfirmModal = false;
      },
    });
  }
}
