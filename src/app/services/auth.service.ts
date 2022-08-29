import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  userData: any;

  constructor(private router: Router, private http: HttpClient) {}

  // Is logged In
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // Set Token and save to localstorage
  addUserDataToLocalStorage(data: any): void {
    // localStorage.setItem('token', token)
    localStorage.setItem('data', JSON.stringify(data));
  }

  // Set Token to localstorage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get Token from localstorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get Users Data from Local storage
  getUser() {
    this.userData = localStorage.getItem('data');
    let data = JSON.parse(this.userData);
    return data;
  }

  // Get all users
  allUser() {
    return this.http.get(`${this.baseUrl}users`, this.getHttpOptions());
  }

  // Get users by id
  getUserById(userId: any) {
    return this.http.get(
      `${this.baseUrl}users/${userId}`,
      this.getHttpOptions()
    );
  }

  // Get Parent Children
  getParentChildren(userId: any) {
    return this.http.get(
      `${this.baseUrl}parents/${userId}/learners`,
      this.getHttpOptions()
    );
  }

  // Sign Up
  addUser(data: any) {
    return this.http.post(`${this.baseUrl}users`, data, this.getHttpOptions());
  }

  // Login
  login(data: any) {
    return this.http.post(
      `${this.baseUrl}users/login`,
      data,
      this.getHttpOptions()
    );
  }

  // Enroll child
  enrollChild(data: any) {
    return this.http.post(
      `${this.baseUrl}learners/enroll`,
      data,
      this.getHttpOptions()
    );
  }

  // Activate email
  confirmEmail(model: any) {
    return this.http.put(
      `${this.baseUrl}users/activate`,
      model,
      this.getHttpOptions()
    );
  }

  // Update user
  updateUser(data: any) {
    return this.http.put(`${this.baseUrl}users`, data, this.getHttpOptions());
  }

  // Log Out
  logOut() {
    // Remove token
    localStorage.removeItem('token');

    // Remove User data
    localStorage.removeItem('data');

    // Route user back to login
    this.router.navigate(['login']);
  }

  // Send password reset email
  sendResetEmail(email: string) {
    return this.http.post(
      `${this.baseUrl}users/send-password-reset-email`,
      email,
      this.getHttpOptions()
    );
  }

  // Resend Verification email
  resendVerificationEmail(email: string) {
    let payload = {
      email: email,
    };
    return this.http.post(
      `${this.baseUrl}users/resend-verification-email`,
      payload,
      this.getHttpOptions()
    );
  }

  // Resend Verification email
  resetPassword(data: any) {
    return this.http.post(
      `${this.baseUrl}users/reset-password`,
      data,
      this.getHttpOptions()
    );
  }

  // login(data: any) {
  //   return this.http.post(this.baseUrl + 'users/login', data, this.getHttpOptions()).pipe(
  //     map((res: any) => {
  //       this.setToken(res.data?.user.token)
  //     })
  //   )
  // }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }
}
