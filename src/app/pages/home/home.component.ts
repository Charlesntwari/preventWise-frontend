import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class HomeComponent implements OnInit, OnDestroy {
  bgImages: string[] = ['here-bg.jpg', 'heart.jpg', 'wellness.jpg', 'drinking.jpg'];
  currentImageIndex = 0;
  currentBgImage = this.bgImages[0];
  intervalId: any;

  faqs = [
    {
      question: 'What is the purpose of this app?',
      answer:
        'This app predicts the risk of non-communicable diseases like diabetes using machine learning.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, your data is only used for prediction and is not stored or shared with third parties.',
    },
    {
      question: 'How accurate are the predictions?',
      answer:
        'The models are trained using publicly available health datasets and are reasonably accurate.',
    },
    {
      question: 'Can I use this tool for other diseases?',
      answer:
        'Currently, we support diabetes prediction. More models are coming soon!',
    },
  ];

  activeFAQ: number | null = null;

  toggleFAQ(index: number): void {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form submitted:', this.contactForm.value);
      alert('Your message has been sent! Thank you.');
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.bgImages.length;
      this.currentBgImage = this.bgImages[this.currentImageIndex];
    }, 3000); // change every 3 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
