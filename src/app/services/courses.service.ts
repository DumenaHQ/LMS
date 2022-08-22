import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Get all Courses
  getAllCourses() {
    return this.http.get(this.baseUrl + 'courses', this.getHttpOptions());
  }

  // Get course by course id
  getCourse(courseId: any) {
    return this.http.get(
      this.baseUrl + 'courses/' + courseId,
      this.getHttpOptions()
    );
  }

  // Add Course
  addCourse(data: any) {
    return this.http.post(
      this.baseUrl + 'courses',
      this.getHttpOptions(),
      data
    );
  }

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
