import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Get All Programs
  getAllPrograms() {
    return this.http.get(`${this.baseUrl}programs`, this.getHttpOptions());
  }

  // Get Programs by id
  getProgramsById(programId: any) {
    return this.http.get(
      `${this.baseUrl}programs/${programId}`,
      this.getHttpOptions()
    );
  }

  // Get Programs by id
  getSchools(programId: any) {
    return this.http.get(
      `${this.baseUrl}programs/${programId}/schools`,
      this.getHttpOptions()
    );
  }

  // Add program
  addProgram(data: any) {
    return this.http.post(
      `${this.baseUrl}programs`,
      data,
      this.getHttpOptions()
    );
  }

  // Delete program
  deleteProgram(programId: any) {
    return this.http.delete(
      `${this.baseUrl}programs/${programId}`,
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
