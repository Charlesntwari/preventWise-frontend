import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Placeholder: Replace with real admin check
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (
      user &&
      (user.is_admin === 1 || user.email === 'ntwarichar@gmail.com')
    ) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
