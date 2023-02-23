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
    return this.http.get(`${this.baseUrl}courses`, this.getHttpOptions());
  }

  // Get course by course id
  getCourse(courseId: any) {
    return this.http.get(
      `${this.baseUrl}courses/${courseId}`,
      this.getHttpOptions()
    );
  }
  // Get Module lessons for a course
  getModuleLessons(courseId: string, moduleId: string) {
    return this.http.get(
      `${this.baseUrl}courses/${courseId}/modules/${moduleId}/lessons`,
      this.getHttpOptions()
    );
  }
  // Add Course
  addCourse(data: any) {
    return this.http.post(
      `${this.baseUrl}courses`,
      data,
      this.getHttpOptions()
    );
  }

  // Add Module
  addModule(courseId: string, data: any) {
    return this.http.post(
      `${this.baseUrl}courses/${courseId}/modules`,
      data,
      this.getHttpOptions()
    );
  }

  // Add Lesson to Module
  addLessonToModule(courseId: string, moduleId: string, data: any) {
    return this.http.post(
      `${this.baseUrl}courses/${courseId}/modules/${moduleId}/lessons`,
      data,
      this.getHttpOptionsForMultipart()
    );
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }

  // Get HttpOptions for multipart
  getHttpOptionsForMultipart() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }



}
