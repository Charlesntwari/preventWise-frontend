import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PredictHeartComponent } from './pages/predict-heart/predict-heart.component';
import { PredictDiabetesComponent } from './pages/predict-diabetes/predict-diabetes.component';
import { PredictStrokeComponent } from './pages/predict-stroke/predict-stroke.component';
import { ResultsComponent } from './pages/results/results.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'predict/heart', component: PredictHeartComponent },
  { path: 'predict/diabetes', component: PredictDiabetesComponent },
  { path: 'predict/stroke', component: PredictStrokeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'contact', component: ContactComponent },
];
