import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.getAuthToken();

    // Clone the request and add the Authorization header
    if (authToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
      return next.handle(authReq).pipe(catchError(this.handleError));
    }

    // Handle cases where there's no token
    return next.handle(req);
  }

  // Replace this with your method to retrieve the authentication token
  private getAuthToken(): string | null {
    // Implement logic to get token from storage or service
    // This example gets it from localStorage for simplicity
    return localStorage.getItem('token');
  }

  private handleError(error: any): Observable<any> {
    if (error.status === 401) {
      // Remove token and data from local storage
      localStorage.removeItem('data');
      localStorage.removeItem('token');
      
      // Redirect to login page
      this.router.navigate(['/login']);
      return throwError(error);
    }
    return throwError(error);
  }
}
