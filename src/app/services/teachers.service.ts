import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TeacherlModel } from '../modules/school/components/school-teachers/models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  createTeacherForSchool(data: any) {
    return this.http.post(
      `${this.baseUrl}users/teacher`,
      data,
      this.getHttpOptions()
    );
  }

  deleteTeacherFromSchool(data: TeacherlModel) {
    return this.http.delete(
      `${this.baseUrl}users/teacher/${data.id}`,
      this.getHttpOptions()
    );
  }

  fetchTeachersInSchool(data: any) {
    return this.http.get(
      `${this.baseUrl}schools/${data.id}/teachers`,
      // this.getHttpOptions()
    );
  }

  getHttpOptionsForMultipart() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }

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
