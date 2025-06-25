import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminMessagesComponent implements OnInit {
  messages: any[] = [];
  loading = true;

  constructor(private auth: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.auth.getAllMessages().subscribe({
      next: (msgs) => {
        this.messages = msgs;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to fetch messages');
        this.loading = false;
      },
    });
  }
}
