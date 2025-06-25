import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';

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

  faqs = [
    {
      question: 'What do the input fields mean?',
      answer:
        'Each field corresponds to a medical parameter. For example, "RestingBP" is your resting blood pressure, and "Cholesterol" is your cholesterol level. If unsure, please consult a health professional.',
    },
    {
      question: 'How accurate is the prediction?',
      answer:
        "Our model is trained on standard datasets. While it's useful for insights, it should not replace medical diagnosis.",
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, your data is only used to make a prediction and is not stored unless needed for research with consent.',
    },
    {
      question: 'What model is used?',
      answer:
        'We use a trained machine learning model based on clinical data from reputable datasets such as UCI.',
    },
    {
      question: 'What do the results mean?',
      answer:
        'The result indicates a predicted likelihood of heart disease. 0 = No Heart Disease, 1 = Heart Disease Detected.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.heartForm = this.fb.group({
      Age: [null, [Validators.required, Validators.min(0)]],
      Sex: [null, [Validators.required]],
      ChestPainType: [null, [Validators.required]],
      RestingBP: [null, [Validators.required, Validators.min(0)]],
      Cholesterol: [null, [Validators.required, Validators.min(0)]],
      FastingBS: [null, [Validators.required]],
      RestingECG: [null, [Validators.required]],
      MaxHR: [null, [Validators.required, Validators.min(0)]],
      ExerciseAngina: [null, [Validators.required]],
      Oldpeak: [null, [Validators.required, Validators.min(0)]],
      ST_Slope: [null, [Validators.required]],
      ca: [null, [Validators.required, Validators.min(0), Validators.max(4)]],
      thal: [null, [Validators.required]],
    });
  }

  formatLabel(key: string): string {
    const formatted = key.replace(/([A-Z])/g, ' $1').trim();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  onSubmit() {
    if (this.heartForm.valid) {
      this.authService.predictHeart(this.heartForm.value).subscribe({
        next: (response: any) => {
          const resultText =
            response.prediction === 0 ? 'Low Risk' : 'High Risk';
          const heartResult = {
            prediction: response.prediction,
            result: resultText,
            message:
              resultText === 'Low Risk'
                ? 'You have a low risk of heart disease. Continue maintaining a healthy lifestyle!'
                : 'You have a high risk of heart disease. Please consult with a healthcare professional.',
          };

          // Save to localStorage and navigate
          localStorage.setItem('heart_result', JSON.stringify(heartResult));
          this.router.navigate(['/results']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.toastr.error(
            error.message ||
              'An error occurred while making the prediction. Please try again.'
          );
        },
      });
    }
  }

  toggleFAQ(index: number) {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }
}
