import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) {}

  recordUserActivity(activityType: string) {
    const dateTime = new Date();
    const data = {
      activity_type: activityType,
      activity_data: {
        timestamp: dateTime.toISOString()
      }
    }

    return this.http.post(
      `${this.baseUrl}activites`,
      data,
      this.getHttpOptions()
    );
  }

  getSchoolLearnersActivities() {
    return this.http.get(
      `${this.baseUrl}activites/school-learners`,
      this.getHttpOptions()
    );
  }

  // Get HttpOptions
  getHttpOptions(contentType: string = 'application/json') {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }
}
