import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  baseUrl: string = environment.baseUrl;
  paystackKey: string = environment.paystackKey;

  constructor(private http: HttpClient) {}

  // Get All school learners
  getSchoolLearners(userId: string) {
    return this.http.get(
      `${this.baseUrl}schools/${userId}/learners`,
      this.getHttpOptions()
    );
  }

  // Get payments by user id
  addSchoolLearner(userId: string) {
    return this.http.post(
      `${this.baseUrl}schools/${userId}/learners`,
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
