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
  selector: 'app-predict-stroke',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './predict-stroke.component.html',
  styleUrls: ['./predict-stroke.component.css'],
})
export class PredictStrokeComponent {
  strokeForm: FormGroup;
  activeFAQ: number | null = null;
  faqs = [
    {
      question: 'What is a stroke?',
      answer:
        'A stroke occurs when blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes.',
    },
    {
      question: 'How accurate is the prediction?',
      answer:
        'Our stroke prediction model is trained on a comprehensive dataset of health records and uses various factors to assess risk. While it provides a good indication, it should not replace professional medical advice.',
    },
    {
      question: 'What factors are considered in the prediction?',
      answer:
        'The prediction considers multiple factors including age, hypertension, heart disease, glucose levels, BMI, gender, marital status, work type, residence type, and smoking status.',
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
    this.strokeForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      hypertension: [null, Validators.required],
      heart_disease: [null, Validators.required],
      avg_glucose_level: ['', [Validators.required, Validators.min(0)]],
      bmi: ['', [Validators.required, Validators.min(0)]],
      gender_Male: [null, Validators.required],
      ever_married_Yes: [null, Validators.required],
      work_type: [null, Validators.required],
      Residence_type_Urban: [null, Validators.required],
      smoking_status: [null, Validators.required],
    });
  }

  toggleFAQ(index: number): void {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }

  onSubmit() {
    if (this.strokeForm.valid) {
      const formValue = this.strokeForm.value;
      const formData = {
        age: parseFloat(formValue.age),
        hypertension: formValue.hypertension ? 1 : 0,
        heart_disease: formValue.heart_disease ? 1 : 0,
        avg_glucose_level: parseFloat(formValue.avg_glucose_level),
        bmi: parseFloat(formValue.bmi),
        gender_Male: formValue.gender_Male ? 1 : 0,
        ever_married_Yes: formValue.ever_married_Yes ? 1 : 0,
        work_type_Never_worked: formValue.work_type === 'Never_worked' ? 1 : 0,
        work_type_Private: formValue.work_type === 'Private' ? 1 : 0,
        work_type_Self_employed:
          formValue.work_type === 'Self-employed' ? 1 : 0,
        work_type_children: formValue.work_type === 'children' ? 1 : 0,
        Residence_type_Urban: formValue.Residence_type_Urban ? 1 : 0,
        smoking_status_formerly_smoked:
          formValue.smoking_status === 'formerly smoked' ? 1 : 0,
        smoking_status_never_smoked:
          formValue.smoking_status === 'never smoked' ? 1 : 0,
        smoking_status_smokes: formValue.smoking_status === 'smokes' ? 1 : 0,
      };

      this.authService.predictStroke(formData).subscribe({
        next: (response: any) => {
          const result = response.prediction === 0 ? 'Low' : 'High';
          const strokeResult = {
            prediction: response.prediction,
            result: result,
            message:
              result === 'Low'
                ? 'You have a low risk of stroke. Continue maintaining a healthy lifestyle!'
                : 'You have a high risk of stroke. Please consult with a healthcare professional.',
          };
          localStorage.setItem('stroke_result', JSON.stringify(strokeResult));
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
