import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PredictHeartComponent } from './pages/predict-heart/predict-heart.component';
import { PredictDiabetesComponent } from './pages/predict-diabetes/predict-diabetes.component';
import { PredictStrokeComponent } from './pages/predict-stroke/predict-stroke.component';
import { ResultsComponent } from './pages/results/results.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { AdminDashboardComponent } from './pages/admin-dashboard.component';
import { AdminGuard } from './admin.guard';
import { AdminLayoutComponent } from './components/admin-layout.component';
import { AdminDashboardHomeComponent } from './pages/admin-dashboard-home.component';
import { AdminMessagesComponent } from './pages/admin-messages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'predict/heart', component: PredictHeartComponent },
  { path: 'predict/diabetes', component: PredictDiabetesComponent },
  { path: 'predict/stroke', component: PredictStrokeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardHomeComponent },
      { path: 'manage', component: AdminDashboardComponent },
      { path: 'messages', component: AdminMessagesComponent },
      // Add more admin child routes here if needed
    ],
  },
];
