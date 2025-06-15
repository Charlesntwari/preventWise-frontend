import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.6s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('staggerFadeIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('200ms', [
              animate(
                '0.6s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),

  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  bgImages: string[] = [
    'here-bg.jpg',
    'heart.jpg',
    'wellness.jpg',
    'drinking.jpg',
  ];
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

  ngOnInit() {
    this.startImageRotation();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageRotation() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.bgImages.length;
      this.currentBgImage = this.bgImages[this.currentImageIndex];
    }, 5000);
  }

  toggleFAQ(index: number): void {
    this.activeFAQ = this.activeFAQ === index ? null : index;
  }
}
