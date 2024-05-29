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
  getAllusers() {
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
      this.getHttpOptionsWithoutAuth()
    );
  }

  // Enroll Learner
  enrollLearner(data: any, url: string) {
    return this.http.post(`${this.baseUrl}${url}`, data, this.getHttpOptions());
  }

  // Onboard Admin
  onboardAdmin(data: any) {
    return this.http.post(`${this.baseUrl}admins/enroll`, data, this.getHttpOptions());
  }
  
  // School Analytics
  fetchSchoolAnalytics() {
    return this.http.get(`${this.baseUrl}schools/analytics`);
  }

  // Activate user
  activateUser(userId: any) {
    return this.http.put(`${this.baseUrl}users/${userId}/activate`,
      this.getHttpOptions()
    );
  }

  // Deactivate user
  deactivateUser(userId: any) {
    return this.http.put(`${this.baseUrl}users/${userId}/deactivate`,
      this.getHttpOptions()
    );
  }

  // Activate email
  confirmEmail(model: any) {
    return this.http.put(
      `${this.baseUrl}users/activate`,
      model,
      this.getHttpOptionsWithoutAuth()
    );
  }

  // Update user
  updateUser(data: any) {
    return this.http.put(`${this.baseUrl}users`, data, this.getHttpOptions());
  }

  confirmItem(confirmUrl: string, confirmType: any) {
    if(confirmType === 'patch') { 
      return this.http.patch(
        `${this.baseUrl}${confirmUrl}`,
        {},
        this.getHttpOptions()
      );
    } else if(confirmType === 'put') {
      return this.http.put(
        `${this.baseUrl}${confirmUrl}`,
        {},
        this.getHttpOptions()
      );
    } else {
      return this.http.delete(
        `${this.baseUrl}${confirmUrl}`,
        this.getHttpOptions()
      );
    }
  }

  // Send password reset email
  sendResetEmail(email: string) {
    return this.http.post(
      `${this.baseUrl}users/send-password-reset-email`,
      email,
      this.getHttpOptionsWithoutAuth()
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
      this.getHttpOptionsWithoutAuth()
    );
  }

  // Resend Verification email
  resetPassword(data: any) {
    return this.http.post(
      `${this.baseUrl}users/reset-password`,
      data,
      this.getHttpOptionsWithoutAuth()
    );
  }

  // login(data: any) {
  //   return this.http.post(this.baseUrl + 'users/login', data, this.getHttpOptions()).pipe(
  //     map((res: any) => {
  //       this.setToken(res.data?.user.token)
  //     })
  //   )
  // }

  // Log Out
  logOut() {
    // Remove token
    localStorage.removeItem('token');

    // Remove User data
    localStorage.removeItem('data');

    // Route user back to login
    this.router.navigate(['login']);
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'no-cors' // enables CORS mode
    };
    return httpOptions;
  }
  
  // Get HttpOptions without authorization
  getHttpOptionsWithoutAuth() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      // mode: 'no-cors' // enables CORS mode
    };
    return httpOptions;
  }


  // Get greeting time
  getGreeting(): string {
    const currentHour = new Date().getHours();
    
    const MORNING_START = 5;
    const AFTERNOON_START = 12;
    const EVENING_START = 18;
    
    return currentHour >= MORNING_START && currentHour < AFTERNOON_START
      ? 'Good morning'
      : currentHour >= AFTERNOON_START && currentHour < EVENING_START
      ? 'Good afternoon'
      : 'Good evening';
  }
}
