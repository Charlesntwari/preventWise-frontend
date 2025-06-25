import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  userEmail: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email) {
      this.userEmail = user.email;
      this.contactForm.patchValue({ name: user.email.split('@')[0] });
    }
  }

  onSubmit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email) {
      const formValue = { ...this.contactForm.value, email: user.email };
      if (this.contactForm.valid) {
        this.isSubmitting = true;
        this.submitSuccess = false;
        this.submitError = false;

        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        this.http
          .post('http://localhost:8000/contact', formValue, { headers })
          .subscribe({
            next: () => {
              this.isSubmitting = false;
              this.submitSuccess = true;
              this.contactForm.reset();
            },
            error: () => {
              this.isSubmitting = false;
              this.submitError = true;
            },
          });
      }
    } else {
      this.submitError = true;
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `This field must be at least ${requiredLength} characters long`;
    }
    return '';
  }
}
