import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  diseases = [
    {
      id: 'diabetes',
      name: 'Diabetes',
      description:
        'Diabetes is a chronic disease that affects how your body turns food into energy. There are three main types: Type 1, Type 2, and Gestational Diabetes.',
      symptoms: [
        'Increased thirst and frequent urination',
        'Extreme hunger',
        'Unexplained weight loss',
        'Fatigue and irritability',
        'Blurred vision',
        'Slow-healing sores',
        'Frequent infections',
      ],
      riskFactors: [
        'Family history of diabetes',
        'Age (45 or older)',
        'Physical inactivity',
        'Poor diet',
        'Obesity',
        'High blood pressure',
        'High cholesterol',
        'History of gestational diabetes',
      ],
      predictionParams: [
        { name: 'Pregnancies', description: 'Number of times pregnant' },
        {
          name: 'Glucose',
          description: 'Plasma glucose concentration (mg/dL)',
        },
        {
          name: 'Blood Pressure',
          description: 'Diastolic blood pressure (mm Hg)',
        },
        {
          name: 'Skin Thickness',
          description: 'Triceps skin fold thickness (mm)',
        },
        { name: 'Insulin', description: '2-Hour serum insulin (mu U/ml)' },
        {
          name: 'BMI',
          description: 'Body mass index (weight in kg/(height in m)²)',
        },
        {
          name: 'Diabetes Pedigree Function',
          description: 'Diabetes family history function',
        },
        { name: 'Age', description: 'Age in years' },
      ],
      externalLinks: [
        {
          name: 'CDC Diabetes Information',
          url: 'https://www.cdc.gov/diabetes/basics/index.html',
        },
        {
          name: 'American Diabetes Association',
          url: 'https://www.diabetes.org/',
        },
        {
          name: 'WHO Diabetes Fact Sheet',
          url: 'https://www.who.int/news-room/fact-sheets/detail/diabetes',
        },
        {
          name: 'Mayo Clinic Diabetes Guide',
          url: 'https://www.mayoclinic.org/diseases-conditions/diabetes/symptoms-causes/syc-20371444',
        },
      ],
    },
    {
      id: 'heart',
      name: 'Heart Disease',
      description:
        'Heart disease refers to various types of heart conditions, with coronary artery disease being the most common. It occurs when blood vessels that supply blood to the heart become narrowed or blocked.',
      symptoms: [
        'Chest pain or discomfort (angina)',
        'Shortness of breath',
        'Pain in the neck, jaw, throat, upper abdomen, or back',
        'Nausea, fatigue, and lightheadedness',
        'Irregular heartbeat',
        'Swelling in legs, ankles, and feet',
      ],
      riskFactors: [
        'Age (men 45+, women 55+)',
        'Family history of heart disease',
        'Smoking',
        'High blood pressure',
        'High cholesterol',
        'Diabetes',
        'Obesity',
        'Physical inactivity',
        'Unhealthy diet',
        'Excessive alcohol consumption',
      ],
      predictionParams: [
        { name: 'Age', description: 'Age in years' },
        { name: 'Sex', description: 'Gender (1 = male, 0 = female)' },
        {
          name: 'Chest Pain Type',
          description: 'Type of chest pain (1-4 scale)',
        },
        {
          name: 'Resting Blood Pressure',
          description: 'Blood pressure in mm Hg',
        },
        { name: 'Cholesterol', description: 'Serum cholesterol in mg/dl' },
        {
          name: 'Fasting Blood Sugar',
          description: 'Blood sugar > 120 mg/dl (1 = yes, 0 = no)',
        },
        { name: 'ECG Results', description: 'Electrocardiographic results' },
        { name: 'Max Heart Rate', description: 'Maximum heart rate achieved' },
        {
          name: 'Exercise Angina',
          description: 'Exercise induced angina (1 = yes, 0 = no)',
        },
        {
          name: 'ST Depression',
          description: 'ST depression induced by exercise',
        },
        { name: 'Slope', description: 'Slope of peak exercise ST segment' },
        {
          name: 'Vessels',
          description: 'Number of major vessels colored by fluoroscopy',
        },
        { name: 'Thalassemia', description: 'Thalassemia type' },
      ],
      externalLinks: [
        { name: 'American Heart Association', url: 'https://www.heart.org/' },
        {
          name: 'CDC Heart Disease Information',
          url: 'https://www.cdc.gov/heartdisease/index.htm',
        },
        {
          name: 'Mayo Clinic Heart Disease',
          url: 'https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20353118',
        },
        {
          name: 'WHO Cardiovascular Diseases',
          url: 'https://www.who.int/health-topics/cardiovascular-diseases',
        },
      ],
    },
    {
      id: 'stroke',
      name: 'Stroke',
      description:
        'A stroke occurs when blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes.',
      symptoms: [
        'Sudden numbness or weakness in face, arm, or leg',
        'Sudden confusion or trouble speaking',
        'Sudden trouble seeing in one or both eyes',
        'Sudden trouble walking, dizziness, loss of balance',
        'Sudden severe headache with no known cause',
        'Difficulty understanding speech',
      ],
      riskFactors: [
        'High blood pressure',
        'Smoking or exposure to secondhand smoke',
        'Diabetes',
        'High cholesterol',
        'Obesity',
        'Physical inactivity',
        'Excessive alcohol consumption',
        'Age (55 or older)',
        'Family history of stroke',
        'Previous stroke or TIA',
      ],
      predictionParams: [
        { name: 'Gender', description: 'Gender (1 = male, 0 = female)' },
        { name: 'Age', description: 'Age in years' },
        {
          name: 'Hypertension',
          description: 'History of hypertension (1 = yes, 0 = no)',
        },
        {
          name: 'Heart Disease',
          description: 'History of heart disease (1 = yes, 0 = no)',
        },
        {
          name: 'Ever Married',
          description: 'Marital status (1 = yes, 0 = no)',
        },
        { name: 'Work Type', description: 'Type of work (0-4 scale)' },
        {
          name: 'Residence Type',
          description: 'Type of residence (1 = urban, 0 = rural)',
        },
        {
          name: 'Average Glucose Level',
          description: 'Average glucose level in blood',
        },
        { name: 'BMI', description: 'Body mass index' },
        { name: 'Smoking Status', description: 'Smoking status (0-2 scale)' },
      ],
      externalLinks: [
        { name: 'American Stroke Association', url: 'https://www.stroke.org/' },
        {
          name: 'CDC Stroke Information',
          url: 'https://www.cdc.gov/stroke/index.htm',
        },
        {
          name: 'Mayo Clinic Stroke',
          url: 'https://www.mayoclinic.org/diseases-conditions/stroke/symptoms-causes/syc-20350113',
        },
        {
          name: 'WHO Stroke Fact Sheet',
          url: 'https://www.who.int/news-room/fact-sheets/detail/stroke',
        },
      ],
    },
  ];

  selectedDisease = this.diseases[0];

  selectDisease(disease: any) {
    this.selectedDisease = disease;
  }
}
