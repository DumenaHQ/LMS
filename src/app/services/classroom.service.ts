import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Get Classrooms
  getClassrooms() {
    return this.http.get(`${this.baseUrl}classes`, this.getHttpOptions());
  }

  // Get Classroom by Id
  getClassroomById(classroomId: string) {
    return this.http.get(`${this.baseUrl}classes/${classroomId}`, this.getHttpOptions());
  }
  
  // Add Classroom
  addClassroom(data: any) {
    return this.http.post(
      `${this.baseUrl}classes`,
      data, 
      this.getHttpOptions()
    );
  }

  // Add course to classroom
  addCourseToClassroom(data: any, classroomId: any) {
    return this.http.patch(
      `${this.baseUrl}classes/${classroomId}/courses`,
      data,
      this.getHttpOptions()
      );
  }

  // Add learner to classroom
  addLearnerToClassroom(data: any, classroomId: any) {
    return this.http.patch(
      `${this.baseUrl}classes/${classroomId}/learners`,
      data,
      this.getHttpOptions()
      );
  }
  
  // Edit Classroom
  editClassroom(data: any, classroomId: any) {
    return this.http.put(`${this.baseUrl}classes/${classroomId}`, data, this.getHttpOptions());
  }



  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }
}
