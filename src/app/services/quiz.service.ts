import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Get all quizs
  getAllquizzes() {
    return this.http.get(`${this.baseUrl}quizzes`, this.getHttpOptions());
  }

  // Get quiz by quiz id
  getquizByQuizId(quizId: any) {
    return this.http.get(
      `${this.baseUrl}quizzes/${quizId}`,
      this.getHttpOptions()
    );
  }

  // Add Quiz to quiz
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
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }
}
