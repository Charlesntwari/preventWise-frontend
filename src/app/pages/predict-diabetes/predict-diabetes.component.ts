import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predict-diabetes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './predict-diabetes.component.html',
  styleUrl: './predict-diabetes.component.css',
})
export class PredictDiabetesComponent {
  diabetesForm: FormGroup;
  diabetesResult: { prediction: number; result: string } | null = null;

  faqs = [
    {
      question: 'What is the purpose of this form?',
      answer:
        'This form predicts your likelihood of having diabetes based on health metrics like glucose levels, BMI, and age.',
    },
    {
      question: 'Do I need to provide real medical data?',
      answer:
        'It is recommended to enter accurate values for better predictions, but the tool is for educational and exploratory purposes only.',
    },
    {
      question: 'Is my data stored or shared?',
      answer:
        'No, your data is sent to the backend for prediction and is not stored or shared anywhere.',
    },
    {
      question: 'Can I use this for medical decisions?',
      answer:
        'This is not a diagnostic tool. Please consult with healthcare professionals for medical advice.',
    },
  ];

  activeFAQ: number | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.diabetesForm = this.fb.group({
      pregnancies: [null, [Validators.required]],
      glucose: [null, [Validators.required]],
      blood_pressure: [null, [Validators.required]],
      skin_thickness: [null, [Validators.required]],
      insulin: [null, [Validators.required]],
      bmi: [null, [Validators.required]],
      diabetes_pedigree: [null, [Validators.required]],
      age: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.diabetesForm.valid) {
      this.http
        .post<{ prediction: number; result: string }>(
          'http://127.0.0.1:8000/predict',
          this.diabetesForm.value
        )
        .subscribe({
          next: (response) => {
            localStorage.setItem('diabetes_result', JSON.stringify(response));
            this.router.navigate(['/results']);
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
    } else {
      this.diabetesForm.markAllAsTouched();
    }
  }

  toggleFAQ(index: number) {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }
}
