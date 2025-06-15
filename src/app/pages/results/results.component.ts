import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- required for *ngIf, ngClass

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule], // <-- add this
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  diabetesResult: any = null;
  heartResult: any = null;

  ngOnInit(): void {
    const diabetes = localStorage.getItem('diabetes_result');
    const heart = localStorage.getItem('heart_result');

    if (diabetes) {
      this.diabetesResult = JSON.parse(diabetes);
    }

    if (heart) {
      this.heartResult = JSON.parse(heart);
    }
  }
}
