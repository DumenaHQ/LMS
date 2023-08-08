import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { VerifyCheckComponent } from './components/verify-check/verify-check.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/default/default.module').then(
        (m: any) => m.DefaultModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'verify-email',
    component: VerifyCheckComponent,
    data: {
      title: 'Verify Email',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'activate/:email_hash/:hash_string',
    component: ActivateAccountComponent,
    data: {
      title: 'Verify Account',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'password-reset/:email_hash/:hash_string',
    component: SetNewPasswordComponent,
    data: {
      title: 'Reset Password',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./modules/signup/signup.module').then((m: any) => m.SignupModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m: any) => m.AdminModule),
  },
  {
    path: 'learner',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/learner/learner.module').then(
        (m: any) => m.LearnerModule
      ),
  },
  {
    path: 'parent',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/parent/parent.module').then((m: any) => m.ParentModule),
  },
  {
    path: 'school',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/school/school.module').then((m: any) => m.SchoolModule),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Not Found',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
