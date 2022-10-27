import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Add Quiz to Course
  addQuiz(data: any) {
    return this.http.post(
      `${this.baseUrl}quizzes`,
      data,
      this.getHttpOptions()
    );
  }

  // Add questions to quiz
  addQuestionsToQuiz(quizId: string, data: any) {
    return this.http.post(
      `${this.baseUrl}quizzes/${quizId}/questions`,
      data,
      this.getHttpOptions()
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
