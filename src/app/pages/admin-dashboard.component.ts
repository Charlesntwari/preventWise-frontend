import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, RouterModule],
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'users' | 'predictions' | 'usersWithDisease' | 'dashboard' =
    'users';
  users: any[] = [];
  predictions: any[] = [];
  diseaseFilter: string = 'diabetes';
  usersWithDisease: any[] = [];
  stats: any = null;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.fetchAllUsers();
    this.fetchAllPredictions();
  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'users') {
        this.activeTab = 'users';
      } else if (fragment === 'predictions') {
        this.activeTab = 'predictions';
      } else if (fragment === 'usersWithDisease') {
        this.activeTab = 'usersWithDisease';
      } else {
        this.activeTab = 'users'; // default
      }
    });
    this.fetchAdminStats();
  }

  fetchAdminStats() {
    this.auth.getAdminStats().subscribe({
      next: (stats) => (this.stats = stats),
      error: (err) => {
        this.toastr.error('Failed to fetch stats');
        this.stats = null;
      },
    });
  }

  fetchAllUsers() {
    this.auth.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => {
        this.toastr.error('Failed to fetch users');
        this.users = [];
      },
    });
  }

  fetchUsersWithDisease(diseaseType: string) {
    this.diseaseFilter = diseaseType;
    this.auth.getUsersWithDisease(diseaseType).subscribe({
      next: (users) => (this.usersWithDisease = users),
      error: (err) => {
        this.toastr.error('Failed to fetch users');
        this.usersWithDisease = [];
      },
    });
  }

  deleteUser(userId: number) {
    if (
      confirm(
        'Are you sure you want to delete this user and all their predictions?'
      )
    ) {
      this.auth.deleteUser(userId).subscribe({
        next: (res) => {
          this.toastr.success(res.message || 'User deleted');
          this.fetchAllUsers();
          if (this.activeTab === 'usersWithDisease') {
            this.fetchUsersWithDisease(this.diseaseFilter);
          }
        },
        error: (err) => this.toastr.error('Failed to delete user'),
      });
    }
  }

  fetchAllPredictions() {
    this.auth.getAllPredictions().subscribe({
      next: (preds) => (this.predictions = preds),
      error: (err) => {
        this.toastr.error('Failed to fetch predictions');
        this.predictions = [];
      },
    });
  }
}
