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

  getLearnerQuizResult(quizId: any, learnerId: any) {
    return this.http.get(
      `${this.baseUrl}quizzes/${quizId}/learners/${learnerId}/result`,
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

  // Submit quiz
  submitQuiz(quizId: string, data: any) {
    return this.http.patch(
      `${this.baseUrl}quizzes/${quizId}/submit-answers`,
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

  // Add quiz to course
  addQuizToCourse(quizId: string, data: any) {
    return this.http.put(
      `${this.baseUrl}quizzes/${quizId}/attach`,
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
