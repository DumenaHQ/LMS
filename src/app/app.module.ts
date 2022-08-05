import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { SharedModule } from './modules/shared/shared.module';
import { CheckMailComponent } from './components/check-mail/check-mail.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { VerifyCheckComponent } from './components/verify-check/verify-check.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    ComingSoonComponent,
    CheckMailComponent,
    SetNewPasswordComponent,
    PasswordResetComponent,
    ActivateAccountComponent,
    VerifyCheckComponent,
    ConfirmEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
