import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //-- GET STARTS --//
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

  // Get Program schools
  getProgramSchools(programId: any) {
    return this.http.get(
      `${this.baseUrl}programs/${programId}/schools`,
      this.getHttpOptions()
    );
  }

  // Get Programs by id
  getProgramLearners(programId: any) {
    return this.http.get(
      `${this.baseUrl}programs/${programId}/learners`,
      this.getHttpOptions()
    );
  }

  // Get Programs by id
  getProgramCourses(programId: any) {
    return this.http.get(
      `${this.baseUrl}programs/${programId}/courses`,
      this.getHttpOptions()
    );
  }
  //-- GET ENDS --//

  //-- ADD STARTS --//
  // Add program
  addProgram(data: any) {
    return this.http.post(
      `${this.baseUrl}programs`,
      data,
      this.getHttpOptions()
    );
  }

  // Add school to program
  addSchoolToProgram(data: any, programId: any) {
    return this.http.patch(
      `${this.baseUrl}programs/${programId}/schools`,
      data,
      this.getHttpOptions()
      );
    }

  // Add school to program
  addParentToProgram(data: any, programId: any) {
    return this.http.patch(
      `${this.baseUrl}programs/${programId}/parents`,
      data,
      this.getHttpOptions()
      );
    }
    
  // Add learner to program
  addLearnerToProgram(data: any, programId: any) {
    return this.http.patch(
      `${this.baseUrl}programs/${programId}/learners`,
      data,
      this.getHttpOptions()
      );
    }
  //-- ADD ENDS --//
    
  //-- DELETE STARTS --//
  // Delete program
  deleteProgram(programId: any) {
    return this.http.delete(
      `${this.baseUrl}programs/${programId}`,
      this.getHttpOptions()
      );
    }
  //-- DELETE ENDS --//

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }
}
