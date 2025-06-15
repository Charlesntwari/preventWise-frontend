import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predict-heart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './predict-heart.component.html',
  styleUrls: ['./predict-heart.component.css'],
})
export class PredictHeartComponent {
  heartForm: FormGroup;
  activeFAQ: number | null = null;
  heartResult: { prediction: number; result: string } | null = null;

  faqs = [
    {
      question: '💡 What do the input fields mean?',
      answer:
        'Each field corresponds to a medical parameter. For example, "RestingBP" is your resting blood pressure, and "Cholesterol" is your cholesterol level. If unsure, please consult a health professional.',
    },
    {
      question: '📊 How accurate is the prediction?',
      answer:
        'Our model is trained on standard datasets. While it’s useful for insights, it should not replace medical diagnosis.',
    },
    {
      question: '🔒 Is my data secure?',
      answer:
        'Yes, your data is only used to make a prediction and is not stored unless needed for research with consent.',
    },
    {
      question: '🧠 What model is used?',
      answer:
        'We use a trained machine learning model based on clinical data from reputable datasets such as UCI.',
    },
    {
      question: '📝 What do the results mean?',
      answer:
        'The result indicates a predicted likelihood of heart disease. 0 = No Heart Disease, 1 = Heart Disease Detected.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.heartForm = this.fb.group({
      Age: [null, Validators.required],
      Sex: [null, Validators.required],
      ChestPainType: [null, Validators.required],
      RestingBP: [null, Validators.required],
      Cholesterol: [null, Validators.required],
      FastingBS: [null, Validators.required],
      RestingECG: [null, Validators.required],
      MaxHR: [null, Validators.required],
      ExerciseAngina: [null, Validators.required],
      Oldpeak: [null, Validators.required],
      ST_Slope: [null, Validators.required],
      ca: [null, Validators.required],
      thal: [null, Validators.required],
    });
  }

  formatLabel(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').trim();
  }

  onSubmit() {
    if (this.heartForm.valid) {
      this.http
        .post('http://127.0.0.1:8000/predict/heart', this.heartForm.value)
        .subscribe(
          (res: any) => {
            this.heartResult = {
              prediction: res.prediction,
              result:
                res.prediction === 0
                  ? 'No Heart Disease Detected'
                  : 'High Risk of Heart Disease',
            };
            localStorage.setItem('heart_result', JSON.stringify(res));
            this.router.navigate(['/results']);
          },
          (err) => console.error('Prediction failed', err)
        );
    }
  }

  toggleFAQ(index: number) {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }
}
