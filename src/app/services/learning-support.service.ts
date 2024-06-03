import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LearningSupportService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllQuestions() {
    return this.http.get(`${this.baseUrl}supports/questions`, this.getHttpOptions());
  }
  
  getQuestionsForClass(classId: string) {
    return this.http.get(`${this.baseUrl}supports/class/${classId}/questions`, this.getHttpOptions());
  }

  getQuestionsForSchool(schoolId: string) {
    return this.http.get(`${this.baseUrl}supports/school/${schoolId}/questions`, this.getHttpOptions());
  }

  getQuestionComments(questionId: string) {
    return this.http.get(`${this.baseUrl}supports/questions/${questionId}/comments`, this.getHttpOptions());
  }

  addQuestions(data: any) {
    return this.http.post(`${this.baseUrl}supports/questions`, data, this.getHttpOptions());
  }

  addCommentToQuestion(data: any, questionId: string) {
    return this.http.post(`${this.baseUrl}supports/questions/${questionId}/comments`, data, this.getHttpOptions());
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
}
