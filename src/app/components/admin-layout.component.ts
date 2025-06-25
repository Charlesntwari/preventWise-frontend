import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  imports: [RouterOutlet],
})
export class AdminLayoutComponent implements OnInit {
  currentFragment: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      this.currentFragment = fragment;
    });
  }

  isActive(tab: string): boolean {
    if (tab === 'dashboard') {
      return this.router.url === '/admin' || this.router.url === '/admin/';
    }
    if (tab === 'messages') {
      return this.router.url.startsWith('/admin/messages');
    }
    return (
      this.currentFragment === tab &&
      this.router.url.startsWith('/admin/manage')
    );
  }

  goToTab(tab: string) {
    if (tab === 'dashboard') {
      this.router.navigate(['/admin']);
    } else if (tab === 'messages') {
      this.router.navigate(['/admin/messages']);
    } else {
      this.router.navigate(['/admin/manage'], { fragment: tab });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
