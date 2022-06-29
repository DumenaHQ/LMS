import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.baseUrl
  usersData: any;

  constructor(private router: Router, private http: HttpClient) { }

  // Set Token and save to localstorage
  addUserDataToLocalStorage(token: string, data: any): void {
    localStorage.setItem('token', token)
    localStorage.setItem('data', JSON.stringify(data))
  }

  // Get Token from localstorage
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  // Get Users Data
  getUser() {
    this.usersData = localStorage.getItem("data")
    let data = JSON.parse(this.usersData)
    return data;
  }

  allUser() {
    return this.http.get(this.baseUrl + 'users', this.getHttpOptions())
  }

  // Is logged In
  isLoggedIn() {
    return this.getToken() !== null
  }

  confirmEmail(model: any) {
    return this.http.put(this.baseUrl + 'users/activate', model, this.getHttpOptions())
  }

  // Log Out
  logOut() {
    // Remove token
    localStorage.removeItem('token')

    // Remove User data
    localStorage.removeItem('data')

    // Route user back to login
    this.router.navigate(['login'])
  }

  // Login
  login(data: any) {
    return this.http.post(this.baseUrl + 'users/login', data, this.getHttpOptions())
  }

  // login(data: any) {
  //   return this.http.post(this.baseUrl + 'users/login', data, this.getHttpOptions()).pipe(
  //     map((res: any) => {
  //       this.setToken(res.data?.user.token)
  //     })
  //   )
  // }

  // Sign Up
  addUser(data: any) {
    return this.http.post(this.baseUrl + 'users', data, this.getHttpOptions())
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
    return httpOptions
  }

}
