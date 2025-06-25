import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard-home',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin-dashboard-home.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardHomeComponent implements OnInit {
  stats: any = null;
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Diabetes', 'Heart Disease', 'Stroke'],
    datasets: [
      { data: [0, 0, 0], backgroundColor: ['#3b82f6', '#ec4899', '#a21caf'] },
    ],
  };
  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  constructor(private auth: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.auth.getAdminStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.pieChartData = {
          ...this.pieChartData,
          datasets: [
            {
              ...this.pieChartData.datasets[0],
              data: [
                stats.diabetes_predictions || 0,
                stats.heart_predictions || 0,
                stats.stroke_predictions || 0,
              ],
            },
          ],
        };
      },
      error: () => {
        this.toastr.error('Failed to fetch stats');
        this.stats = null;
      },
    });
  }
}
