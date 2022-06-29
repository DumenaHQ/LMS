import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  baseUrl: string = environment.baseUrl

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  getAllCourses() {
    return this.http.get(this.baseUrl + 'courses', this.getHttpOptions())
  }

  addCourse(data: any) {
    return this.http.post(this.baseUrl + 'courses', data, this.getHttpOptions())
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    }
    return httpOptions
  }
}
