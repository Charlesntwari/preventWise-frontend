import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Base URL for your backend

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('username', credentials.email)
      .set('password', credentials.password);

    return this.http
      .post(`${this.apiUrl}/token`, body.toString(), { headers })
      .pipe(
        map((response: any) => {
          // Check if the response contains an error message
          if (response && response.detail) {
            throw new Error(response.detail);
          }
          // Check if the response has the expected structure
          if (!response || !response.access_token) {
            throw new Error('Invalid response from server');
          }
          return response;
        }),
        catchError((error) => {
          // If it's already an Error object we created, re-throw it
          if (error instanceof Error) {
            return throwError(() => error);
          }
          // Handle HTTP errors
          if (error.status === 401) {
            return throwError(() => new Error('Incorrect email or password'));
          }
          if (error.status === 422) {
            return throwError(() => new Error('Invalid credentials format'));
          }
          // Handle other errors
          return throwError(
            () =>
              new Error(
                error.error?.detail || 'Login failed. Please try again.'
              )
          );
        })
      );
  }

  signup(userInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userInfo).pipe(
      map((response: any) => {
        // Check if the response contains an error message
        if (response && response.detail) {
          throw new Error(response.detail);
        }
        return response;
      }),
      catchError((error) => {
        if (error.status === 400) {
          return throwError(
            () => new Error(error.error?.detail || 'Email already registered')
          );
        }
        return throwError(
          () =>
            new Error(error.error?.detail || 'Signup failed. Please try again.')
        );
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    // Decode and store user info
    try {
      const decoded: any = jwtDecode(token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: decoded.sub,
          is_admin: decoded.is_admin,
        })
      );
    } catch (e) {
      localStorage.removeItem('user');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  getPredictionHistory(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${this.apiUrl}/history`, { headers });
  }

  predictStroke(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/predict/stroke`, data, { headers });
  }

  predictDiabetes(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/predict`, data, { headers });
  }

  predictHeart(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/predict/heart`, data, { headers });
  }

  deletePredictionHistory(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.delete(`${this.apiUrl}/history`, { headers });
  }

  // Admin: Get all users
  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${this.apiUrl}/admin/users`, { headers });
  }

  // Admin: Delete a user by ID
  deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.delete(`${this.apiUrl}/admin/users/${userId}`, {
      headers,
    });
  }

  // Admin: Get all predictions
  getAllPredictions(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${this.apiUrl}/admin/predictions`, { headers });
  }

  // Admin: Get users with a specific disease
  getUsersWithDisease(diseaseType: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(
      `${this.apiUrl}/admin/users-with-disease/${diseaseType}`,
      { headers }
    );
  }

  // Admin: Get dashboard stats
  getAdminStats(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${this.apiUrl}/admin/stats`, { headers });
  }

  // Admin: Get all contact messages
  getAllMessages(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${this.apiUrl}/admin/messages`, { headers });
  }
}
