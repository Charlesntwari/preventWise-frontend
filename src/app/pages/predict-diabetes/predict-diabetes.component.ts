import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-predict-diabetes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './predict-diabetes.component.html',
  styleUrls: ['./predict-diabetes.component.css'],
})
export class PredictDiabetesComponent {
  diabetesForm: FormGroup;
  activeFAQ: number | null = null;
  faqs = [
    {
      question: 'What is diabetes?',
      answer:
        'Diabetes is a chronic disease that affects how your body turns food into energy. There are three main types: Type 1, Type 2, and Gestational Diabetes.',
    },
    {
      question: 'How accurate is the prediction?',
      answer:
        'Our diabetes prediction model is trained on a comprehensive dataset of health records and uses various factors to assess risk. While it provides a good indication, it should not replace professional medical advice.',
    },
    {
      question: 'What should I do if I get a high-risk prediction?',
      answer:
        'If you receive a high-risk prediction, we recommend consulting with a healthcare professional for a comprehensive evaluation and personalized advice.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.diabetesForm = this.fb.group({
      pregnancies: ['', [Validators.required, Validators.min(0)]],
      glucose: ['', [Validators.required, Validators.min(0)]],
      blood_pressure: ['', [Validators.required, Validators.min(0)]],
      skin_thickness: ['', [Validators.required, Validators.min(0)]],
      insulin: ['', [Validators.required, Validators.min(0)]],
      bmi: ['', [Validators.required, Validators.min(0)]],
      diabetes_pedigree: ['', [Validators.required, Validators.min(0)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
    });
  }

  toggleFAQ(index: number): void {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }

  onSubmit() {
    if (this.diabetesForm.valid) {
      this.authService.predictDiabetes(this.diabetesForm.value).subscribe({
        next: (response: any) => {
          const result = response.prediction === 0 ? 'Negative' : 'Positive';
          const diabetesResult = {
            prediction: response.prediction,
            result: result,
            message:
              result === 'Negative'
                ? 'You have a low risk of diabetes. Continue maintaining a healthy lifestyle!'
                : 'You have a high risk of diabetes. Please consult with a healthcare professional.',
          };
          localStorage.setItem(
            'diabetes_result',
            JSON.stringify(diabetesResult)
          );
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
}
