import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClassTemplateDetailModel } from '../modules/admin/components/class-template/display-admin-class-template/details-display-admin-class-template/interfaces/class-template.model';
import { ClassroomModel } from '../modules/school/components/school-classrooms/display-school-classrooms/models/classroom.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  checkClassActiveSession(classroom?: ClassroomModel) {
    return classroom && (classroom.terms || []).find((term) => {
      const now = new Date();

      // Check if current date is between start date and end date
       return (
        term.start_date &&
        term.end_date &&
        new Date(term.start_date) <= now &&
        new Date(term.end_date) >= now
      );
    });
  }

  getClassrooms() {
    return this.http.get(`${this.baseUrl}classes`, this.getHttpOptions());
  }

  getClassroomById(classroomId: string) {
    return this.http.get(`${this.baseUrl}classes/${classroomId}`, this.getHttpOptions());
  }
  
  addClassroom(data: any) {
    return this.http.post(
      `${this.baseUrl}classes`,
      data, 
      this.getMultipartHttpOptions()
    );
  }

  addCourseToClassroom(data: any, classroomId: any) {
    return this.http.patch(
      `${this.baseUrl}classes/templates/${classroomId}/courses`,
      // `${this.baseUrl}classes/${classroomId}/courses`,
      data,
      this.getHttpOptions()
      );
  }

  addLearnerToClassroom(data: any, classroomId: any) {
    return this.http.patch(
      `${this.baseUrl}classes/${classroomId}/learners`,
      data,
      this.getHttpOptions()
      );
  }

  subscribeLearnerToClassroom(data: any, classroomId: any) {
    return this.http.post(
      `${this.baseUrl}classes/${classroomId}/subscribe`,
      data,
      this.getHttpOptions()
      );
  }
  
  editClassroom(data: any, classroomId: any) {
    return this.http.put(`${this.baseUrl}classes/${classroomId}`, data, this.getMultipartHttpOptions());
  }

  getQuizResultsByQuizId(classroomId: string, quizId: string) {
    return this.http.get(`${this.baseUrl}classes/${classroomId}/quizes/${quizId}/result`, this.getHttpOptions());
  }

  //--- TEMPLATES STARTS --//
  getClassroomTemplates() {
    return this.http.get(`${this.baseUrl}classes/templates`, this.getHttpOptions());
  }

  getClassroomTemplateById(templateId: string) {
    return this.http.get(`${this.baseUrl}classes/templates/${templateId}`, this.getHttpOptions());
  }

  addClassroomTemplate(data: any) {
    return this.http.post(
      `${this.baseUrl}classes/templates`,
      data, 
      this.getHttpOptions()
    );
  }
  
  addCourseToClassroomTemplate(data: any, templateId: any) {
    return this.http.patch(
      `${this.baseUrl}classes/templates/${templateId}/courses`,
      data,
      this.getHttpOptions()
      );
  }

  // Add classroom template
  editClassroomTemplate(data: any, templateId: any) {
    return this.http.put(
      `${this.baseUrl}classes/templates/${templateId}`,
      data,
      this.getHttpOptions()
      );
    }

  updateClassroomTemplate(classroomTemplate: ClassTemplateDetailModel, data: any) {
    return this.http.put(
      `${this.baseUrl}classes/templates/${classroomTemplate.id}`,
      data, 
      this.getHttpOptions()
    );
  }

  //--- TEMPLATES ENDS --//

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

  getMultipartHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }
}
