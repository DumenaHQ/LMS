import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
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
      this.getHttpOptions('application/json')
    );
  }

  // Get download learners list
  // getDownloadLearnersList(userId: string) {
  //   return this.http.get(
  //     `${this.baseUrl}schools/${userId}/download-students-list`,
  //     this.getHttpOptions('application/json')
  //   );

    
  //   // return this.http
  //   //   .get(
  //     //     `${this.baseUrl}schools/${userId}/download-students-list`
  //     //   )
  //     //   .pipe(
  //       //     switchMap((res: any) => {
  //         //       console.log(`Download students list successfully`, res);
  //         //       return of(res);
  //         //     }),
  //   //     catchError((err: any) => {
  //   //       return throwError(() => new Error(err.error.message));
  //   //     })
  //   //   );
  // }
  
  // Get Download template sample files
  // downloadSampleFiles(name: string) {
  //   return this.http.get(
  //     `${this.baseUrl}downloads/template?name=${name}`,
  //     this.getHttpOptions('application/octet-stream')
  //   );
  // }

  // Get payments by user id
  addSchoolLearner(userId: string) {
    return this.http.post(
      `${this.baseUrl}schools/${userId}/learners`,
      this.getHttpOptions('application/json') 
    );
  }

  // Get HttpOptions
  getHttpOptions(contentType: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }
}
